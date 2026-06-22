import { Head, router, useForm, usePage } from '@inertiajs/react';
import { Circle, Menu, Search, SendHorizontal, X } from 'lucide-react';
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

function formatLocalTime(isoOrFormatted: string): string {
    try {
        const date = new Date(isoOrFormatted);

        if (isNaN(date.getTime())) {
            return isoOrFormatted;
        }

        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch {
        return isoOrFormatted;
    }
}

function Avatar({
    photo,
    name,
    size = 'md',
    online,
}: {
    photo: string | null;
    name: string;
    size?: 'sm' | 'md';
    online?: boolean;
}) {
    const dim = size === 'sm' ? 'h-8 w-8 text-xs' : 'h-11 w-11 text-sm';

    return (
        <span
            className={`relative inline-flex shrink-0 cursor-pointer! items-center justify-center overflow-hidden rounded-full bg-[#35ADD5] font-semibold text-white ${dim}`}
        >
            {photo ? (
                <img
                    src={photo}
                    alt={name}
                    className="h-full w-full object-cover"
                />
            ) : (
                <span>{name.charAt(0).toUpperCase()}</span>
            )}
            {online && (
                <Circle className="absolute -right-0.5 -bottom-0.5 h-3 w-3 fill-[#22c55e] text-white" />
            )}
        </span>
    );
}

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
    const [sidebarOpen, setSidebarOpen] = useState(false);

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
        if (!auth?.user?.id) {
            console.log(' No user ID for Echo');
            return;
        }

        if (!window.Echo) {
            console.log(' Echo not initialized');
            return;
        }

        console.log(' Setting up Echo for user:', auth.user.id);
        const channelName = `messages.${auth.user.id}`;
        console.log(' Subscribing to channel:', channelName);

        const channel = window.Echo.private(channelName);

        console.log('👂 Listening for .message.sent event');
        channel.listen('.message.sent', (payload: BroadcastPayload) => {
            console.log(' Received message event:', payload);
            
            const isRelevant =
                (payload.sender_id === selectedUserId &&
                    payload.receiver_id === auth.user.id) ||
                (payload.sender_id === auth.user.id &&
                    payload.receiver_id === selectedUserId);

            if (!isRelevant) {
                return;
            }

            setLiveMessages((prev) => {
                if (prev.some((m) => m.id === payload.id)) {
                    return prev;
                }

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

        channel.subscribed(() => {
            console.log('✅ Successfully subscribed to channel');
        });

        channel.error((error: any) => {
            console.error('❌ Channel error:', error);
        });

        return () => {
            console.log('🧹 Cleaning up Echo listener');
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
        setSidebarOpen(false);
        router.get(
            messagesRoute(),
            { with: id },
            { preserveState: true, preserveScroll: false },
        );
    };

    const handleSendMessage = () => {
        if (!data.body.trim() || !data.receiver_id) {
            return;
        }

        const optimistic: ChatMessage = {
            id: crypto.randomUUID(),
            fromMe: true,
            body: data.body.trim(),
            time: new Date().toISOString(),
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

            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] px-2 py-3 sm:px-4 sm:py-4 lg:px-8 lg:py-5">
                <div className="mx-auto flex h-[calc(100dvh-90px)] w-full max-w-7xl overflow-hidden rounded-2xl border border-[#d8e7ef] bg-white shadow-[0_8px_32px_rgba(17,57,93,0.08)] sm:rounded-3xl sm:shadow-[0_18px_40px_rgba(17,57,93,0.08)]">
                    {sidebarOpen && (
                        <div
                            className="fixed inset-0 z-40 bg-black/30 md:hidden"
                            onClick={() => setSidebarOpen(false)}
                        />
                    )}

                    <aside
                        className={`fixed inset-y-0 left-0 z-50 flex w-[85vw] max-w-[320px] flex-col border-r border-[#e4edf3] bg-white transition-transform duration-300 ease-in-out md:static md:z-auto md:w-[280px] md:translate-x-0 md:transition-none lg:w-[320px] ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} `}
                    >
                        <div className="border-b border-[#e4edf3] px-4 py-3 sm:px-5 sm:py-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-semibold tracking-[0.2em] text-[#7b92a7] uppercase sm:text-xs">
                                        Inbox
                                    </p>
                                    <h2 className="mt-0.5 text-lg font-semibold text-[#0c304d] sm:mt-1 sm:text-xl">
                                        Conversations
                                    </h2>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(false)}
                                    className="cursor-pointer rounded-xl p-2 text-[#6c8398] hover:bg-[#edf5fa] md:hidden"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="relative mt-3">
                                <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#8ea3b5]" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by name or role"
                                    className="w-full rounded-xl border border-[#d7e5ee] bg-[#f9fcfe] py-2 pr-3 pl-9 text-sm text-[#234560] placeholder:text-[#92a4b3] focus:border-[#35ADD5] focus:ring-2 focus:ring-[#b9d3e5] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-2 sm:p-3">
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
                                        className={`mb-1.5 flex w-full cursor-pointer! items-start gap-3 rounded-2xl p-2.5 text-left transition-colors sm:mb-2 sm:p-3 ${
                                            isActive
                                                ? 'bg-[#eaf4fb]'
                                                : 'hover:bg-[#f4f9fc]'
                                        }`}
                                    >
                                        <Avatar
                                            photo={conversation.photo}
                                            name={conversation.name}
                                            online={conversation.online}
                                        />

                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-center justify-between gap-2">
                                                <span className="truncate text-sm font-semibold text-[#0c304d]">
                                                    {conversation.name}
                                                </span>
                                                <span className="shrink-0 text-[11px] text-[#88a0b2]">
                                                    {conversation.time}
                                                </span>
                                            </span>
                                            <span className="mt-0.5 block text-xs font-medium text-[#6e8498]">
                                                {conversation.role}
                                            </span>
                                            <span className="mt-0.5 block truncate text-xs text-[#4f667a]">
                                                {conversation.preview}
                                            </span>
                                        </span>

                                        {conversation.unread > 0 && (
                                            <span className="inline-flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#35ADD5] px-1.5 text-[11px] font-semibold text-white">
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

                    <section className="flex min-w-0 flex-1 flex-col">
                        <header className="flex items-center gap-3 border-b border-[#e4edf3] px-3 py-3 sm:px-6 sm:py-4">
                            <button
                                type="button"
                                onClick={() => setSidebarOpen(true)}
                                className="shrink-0 rounded-xl p-2 text-[#6c8398] hover:bg-[#edf5fa] md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                            </button>

                            {selectedUser ? (
                                <div className="flex min-w-0 items-center gap-3">
                                    <Avatar
                                        photo={selectedUser.photo}
                                        name={selectedUser.name}
                                        online={selectedUser.online}
                                    />
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-semibold text-[#0c304d]">
                                            {selectedUser.name}
                                        </p>
                                        <p className="text-xs text-[#6f8599]">
                                            {selectedUser.online
                                                ? 'Active now'
                                                : selectedUser.role}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <span className="text-sm text-[#7890a3]">
                                    Select a conversation
                                </span>
                            )}
                        </header>

                        <div className="flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,#f6fbff_0%,#ffffff_58%)] px-3 py-4 sm:px-6 sm:py-5">
                            {!selectedUser ? (
                                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#eaf4fb]">
                                        <Search className="h-7 w-7 text-[#7890a3]" />
                                    </div>
                                    <p className="text-sm font-medium text-[#4f667a]">
                                        No conversation selected
                                    </p>
                                    <p className="text-xs text-[#7890a3]">
                                        Choose from the sidebar to start
                                        messaging
                                    </p>
                                    <button
                                        type="button"
                                        onClick={() => setSidebarOpen(true)}
                                        className="mt-1 rounded-xl bg-[#35ADD5] px-4 py-2 text-xs font-medium text-white hover:bg-[#123c5e] md:hidden"
                                    >
                                        Open Conversations
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {liveMessages.map((chat) => (
                                        <div
                                            key={chat.id}
                                            className={`flex items-end gap-2 ${chat.fromMe ? 'justify-end' : 'justify-start'}`}
                                        >
                                            {!chat.fromMe && (
                                                <Avatar
                                                    photo={selectedUser.photo}
                                                    name={selectedUser.name}
                                                    size="sm"
                                                />
                                            )}
                                            <article
                                                className={`max-w-[78%] rounded-2xl px-3 py-2.5 shadow-sm sm:max-w-[65%] sm:px-4 sm:py-3 ${
                                                    chat.fromMe
                                                        ? 'rounded-br-md bg-[#35ADD5] text-white'
                                                        : 'rounded-bl-md border border-[#dbe9f1] bg-white text-[#28465f]'
                                                }`}
                                            >
                                                <p className="text-sm leading-relaxed">
                                                    {chat.body}
                                                </p>
                                                <p
                                                    className={`mt-1 text-[10px] sm:text-[11px] ${
                                                        chat.fromMe
                                                            ? 'text-[#c7d8e6]'
                                                            : 'text-[#7f95a8]'
                                                    }`}
                                                >
                                                    {formatLocalTime(chat.time)}
                                                </p>
                                            </article>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            )}
                        </div>

                        <footer className="border-t border-[#e4edf3] bg-white px-3 py-3 sm:px-6 sm:py-4">
                            <div className="flex items-center gap-2 rounded-2xl border border-[#d7e5ee] bg-[#f9fcfe] px-3 py-2">
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
                                    className="h-9 flex-1 bg-transparent text-sm text-[#1f415c] placeholder:text-[#8fa3b3] focus:outline-none disabled:cursor-not-allowed disabled:opacity-60 sm:h-10"
                                />

                                <button
                                    type="button"
                                    onClick={handleSendMessage}
                                    disabled={
                                        !data.body.trim() ||
                                        !selectedUser ||
                                        processing
                                    }
                                    className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl bg-[#35ADD5] px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-[#123c5e] disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-sm"
                                >
                                    {processing ? 'Sending…' : 'Send'}
                                    <SendHorizontal className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
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
