import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Circle, Menu, Paperclip, Search, SendHorizontal } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { messages, messages as messagesRoute } from '@/routes';

type Conversation = {
    id: string;
    name: string;
    role: string;
    preview: string;
    time: string;
    unread: number;
    online: boolean;
    photo: string | null;
};

type ChatMessage = {
    id: string;
    fromMe: boolean;
    body: string;
    time: string;
};

type SelectedUser = {
    id: string;
    name: string;
    role: string;
    online: boolean;
    photo: string | null;
} | null;

type PageProps = {
    conversations: Conversation[];
    chatMessages: ChatMessage[];
    selectedUserId: string | null;
    selectedUser: SelectedUser;
    auth: { user: { id: string } };
};

type BroadcastPayload = {
    id: string;
    sender_id: string;
    receiver_id: string;
    body: string;
    time: string;
};

export default function MessagesPage() {
    const {
        conversations,
        chatMessages: initialMessages,
        selectedUserId,
        selectedUser,
        auth,
    } = usePage<PageProps>().props;

    const [liveMessages, setLiveMessages] =
        useState<ChatMessage[]>(initialMessages);
    const [search, setSearch] = useState('');
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    const { data, setData, post, processing, reset } = useForm({
        receiver_id: selectedUserId ?? '',
        body: '',
    });

    useEffect(() => {
        setLiveMessages(initialMessages);
    }, [initialMessages]);

    useEffect(() => {
        setData('receiver_id', selectedUserId ?? '');
    }, [selectedUserId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [liveMessages]);

    useEffect(() => {
        if (!auth?.user?.id) return;
        if (!window.Echo) return;

        const channel = window.Echo.private(`messages.${auth.user.id}`);

        channel.listen('.message.sent', (payload: BroadcastPayload) => {
            const isRelevant =
                (payload.sender_id === selectedUserId &&
                    payload.receiver_id === auth.user.id) ||
                (payload.sender_id === auth.user.id &&
                    payload.receiver_id === selectedUserId);

            if (!isRelevant) return;

            setLiveMessages((prev) => {
                if (prev.some((m) => m.id === payload.id)) return prev;

                return [
                    ...prev,
                    {
                        id: payload.id,
                        fromMe: payload.sender_id === auth.user.id,
                        body: payload.body,
                        time: payload.time,
                    },
                ];
            });
        });

        return () => {
            channel.stopListening('.message.sent');
        };
    }, [auth?.user?.id, selectedUserId]);

    const filteredConversations = useMemo(() => {
        const value = search.toLowerCase();
        return conversations.filter(
            (c) =>
                c.name.toLowerCase().includes(value) ||
                c.role.toLowerCase().includes(value),
        );
    }, [conversations, search]);

    const handleSelectConversation = (id: string) => {
        setMobileSidebarOpen(false);
        router.get(
            messagesRoute(),
            { with: id },
            { preserveState: true, preserveScroll: false },
        );
    };

    const handleSendMessage = () => {
        if (!data.body.trim() || !data.receiver_id) return;

        const optimistic: ChatMessage = {
            id: crypto.randomUUID(),
            fromMe: true,
            body: data.body.trim(),
            time: new Date().toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setLiveMessages((prev) => [...prev, optimistic]);

        post(messages(), {
            preserveScroll: true,
            onSuccess: () => reset('body'),
            onError: () => {
                setLiveMessages((prev) =>
                    prev.filter((m) => m.id !== optimistic.id),
                );
            },
        });
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <>
            <Head title="Messages" />

            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto flex h-[calc(100vh-130px)] w-full max-w-8xl overflow-hidden rounded-3xl border border-[#d8e7ef] bg-white shadow-[0_18px_40px_rgba(17,57,93,0.08)]">
                    <aside
                        className={`absolute inset-y-0 left-0 z-30 flex w-[320px] shrink-0 flex-col border-r border-[#e4edf3] bg-white transition-transform duration-300 md:static md:translate-x-0 ${
                            mobileSidebarOpen
                                ? 'translate-x-0'
                                : '-translate-x-full'
                        }`}
                    >
                        <div className="border-b border-[#e4edf3] px-5 py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs font-semibold tracking-[0.2em] text-[#7b92a7] uppercase">
                                        Inbox
                                    </p>
                                    <h2 className="mt-1 text-xl font-semibold text-[#0c304d]">
                                        Conversations
                                    </h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setMobileSidebarOpen(false)}
                                    className="cursor-pointer rounded-xl p-2 text-[#6c8398] hover:bg-[#edf5fa] md:hidden"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="relative mt-4">
                                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8ea3b5]" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name or role"
                                    className="w-full rounded-xl border border-[#d7e5ee] bg-[#f9fcfe] py-2.5 pr-3 pl-9 text-sm text-[#234560] placeholder:text-[#92a4b3] focus:border-[#0d314d] focus:ring-2 focus:ring-[#b9d3e5] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3">
                            {filteredConversations.map((conversation) => {
                                const isActive =
                                    conversation.id === selectedUserId;

                                return (
                                    <button
                                        key={conversation.id}
                                        type="button"
                                        onClick={() =>
                                            handleSelectConversation(
                                                conversation.id,
                                            )
                                        }
                                        className={`mb-2 flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors ${
                                            isActive
                                                ? 'bg-[#eaf4fb]'
                                                : 'hover:bg-[#f4f9fc]'
                                        }`}
                                    >
                                        {/* ✅ Use conversation.photo and conversation.name — NOT selectedUser */}
                                        <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0d314d] text-sm font-semibold text-white">
                                            {conversation.photo ? (
                                                <img
                                                    src={conversation.photo}
                                                    alt={conversation.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span>
                                                    {conversation.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            )}
                                            {conversation.online && (
                                                <Circle className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 fill-[#22c55e] text-white" />
                                            )}
                                        </span>

                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-center justify-between gap-2">
                                                <span className="truncate text-sm font-semibold text-[#0c304d]">
                                                    {conversation.name}
                                                </span>
                                                <span className="text-xs text-[#88a0b2]">
                                                    {conversation.time}
                                                </span>
                                            </span>
                                            <span className="mt-0.5 block text-xs font-medium text-[#6e8498]">
                                                {conversation.role}
                                            </span>
                                            <span className="mt-1 block truncate text-sm text-[#4f667a]">
                                                {conversation.preview}
                                            </span>
                                        </span>

                                        {conversation.unread > 0 && (
                                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0d314d] px-1.5 text-[11px] font-semibold text-white">
                                                {conversation.unread}
                                            </span>
                                        )}
                                    </button>
                                );
                            })}

                            {!filteredConversations.length && (
                                <div className="flex h-40 items-center justify-center text-sm text-[#7890a3]">
                                    No conversations found
                                </div>
                            )}
                        </div>
                    </aside>

                    {mobileSidebarOpen && (
                        <div
                            className="absolute inset-0 z-20 bg-black/20 md:hidden"
                            onClick={() => setMobileSidebarOpen(false)}
                        />
                    )}

                    <section className="flex min-w-0 flex-1 flex-col">
                        <header className="flex items-center justify-between border-b border-[#e4edf3] px-4 py-4 sm:px-6">
                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setMobileSidebarOpen(true)}
                                    className="rounded-xl p-2 text-[#6c8398] hover:bg-[#edf5fa] md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                </button>

                                {selectedUser ? (
                                    <>
                                        {/* ✅ Header avatar uses selectedUser.photo correctly */}
                                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#0d314d] text-sm font-semibold text-white">
                                            {selectedUser.photo ? (
                                                <img
                                                    src={selectedUser.photo}
                                                    alt={selectedUser.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span>
                                                    {selectedUser.name
                                                        .charAt(0)
                                                        .toUpperCase()}
                                                </span>
                                            )}
                                        </span>
                                        <span>
                                            <span className="block text-sm font-semibold text-[#0c304d]">
                                                {selectedUser.name}
                                            </span>
                                            <span className="block text-xs text-[#6f8599]">
                                                {selectedUser.online
                                                    ? 'Active now'
                                                    : selectedUser.role}
                                            </span>
                                        </span>
                                    </>
                                ) : (
                                    <span className="text-sm text-[#7890a3]">
                                        Select a conversation
                                    </span>
                                )}
                            </div>
                        </header>

                        <div className="flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_top,#f6fbff_0%,#ffffff_58%)] px-4 py-5 sm:px-6">
                            {!selectedUser && (
                                <div className="flex h-full items-center justify-center text-sm text-[#7890a3]">
                                    Choose a conversation from the sidebar
                                </div>
                            )}

                            {liveMessages.map((chat) => (
                                <div
                                    key={chat.id}
                                    className={`flex ${chat.fromMe ? 'justify-end' : 'justify-start'}`}
                                >
                                    <article
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[78%] ${
                                            chat.fromMe
                                                ? 'rounded-br-md bg-[#0d314d] text-white'
                                                : 'rounded-bl-md border border-[#dbe9f1] bg-white text-[#28465f]'
                                        }`}
                                    >
                                        <p className="text-sm leading-relaxed">
                                            {chat.body}
                                        </p>
                                        <p
                                            className={`mt-1 text-[11px] ${chat.fromMe ? 'text-[#c7d8e6]' : 'text-[#7f95a8]'}`}
                                        >
                                            {chat.time}
                                        </p>
                                    </article>
                                </div>
                            ))}

                            <div ref={messagesEndRef} />
                        </div>

                        <footer className="border-t border-[#e4edf3] bg-white px-4 py-4 sm:px-6">
                            <div className="flex items-center gap-2 rounded-2xl border border-[#d7e5ee] bg-[#f9fcfe] p-2">
                                <button
                                    type="button"
                                    className="cursor-pointer rounded-xl p-2 text-[#6c8398] transition-colors hover:bg-[#ebf4fa] hover:text-[#0d314d]"
                                >
                                    <Paperclip className="h-4 w-4" />
                                </button>

                                <input
                                    type="text"
                                    value={data.body}
                                    onChange={(e) =>
                                        setData('body', e.target.value)
                                    }
                                    onKeyDown={handleKeyDown}
                                    placeholder={
                                        selectedUser
                                            ? 'Write a message...'
                                            : 'Select a conversation first'
                                    }
                                    disabled={!selectedUser || processing}
                                    className="h-10 flex-1 bg-transparent px-1 text-sm text-[#1f415c] placeholder:text-[#8fa3b3] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60"
                                />

                                <button
                                    type="button"
                                    onClick={handleSendMessage}
                                    disabled={
                                        !data.body.trim() ||
                                        !selectedUser ||
                                        processing
                                    }
                                    className="inline-flex cursor-pointer items-center gap-1 rounded-xl bg-[#0d314d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#123c5e] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {processing ? 'Sending…' : 'Send'}
                                    <SendHorizontal className="h-4 w-4" />
                                </button>
                            </div>
                        </footer>
                    </section>
                </div>
            </div>
        </>
    );
}

MessagesPage.layout = {
    breadcrumbs: [{ title: 'Messages', href: messages() }],
    pageHeader: {
        title: 'Messages',
        description:
            'Coordinate with captains, deckhands, and charterers in one place.',
    },
};
