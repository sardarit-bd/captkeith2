import { Head } from '@inertiajs/react';
import {
    Circle,
    Paperclip,
    Search,
    SendHorizontal,
} from 'lucide-react';
import { messages } from '@/routes';

type Conversation = {
    id: string;
    name: string;
    role: string;
    preview: string;
    time: string;
    unread: number;
    online: boolean;
};

type ChatMessage = {
    id: string;
    fromMe: boolean;
    body: string;
    time: string;
};

const conversations: Conversation[] = [
    {
        id: 'capt-james',
        name: 'Captain James Morrison',
        role: 'Captain',
        preview: 'I can confirm availability for Saturday at 9:00 AM.',
        time: '2m',
        unread: 2,
        online: true,
    },
    {
        id: 'capt-sarah',
        name: 'Captain Sarah Chen',
        role: 'Captain',
        preview: 'Please share the route details and expected duration.',
        time: '19m',
        unread: 0,
        online: false,
    },
    {
        id: 'charter-mark',
        name: 'Mark Ellison',
        role: 'Charterer',
        preview: 'Insurance confirmation is uploaded. Thanks.',
        time: '1h',
        unread: 1,
        online: true,
    },
    {
        id: 'deck-ana',
        name: 'Ana Rodriguez',
        role: 'Deckhand',
        preview: 'I can join as support crew if needed.',
        time: 'Yesterday',
        unread: 0,
        online: false,
    },
];

const activeConversation = conversations[0];

const chatMessages: ChatMessage[] = [
    {
        id: 'm1',
        fromMe: false,
        body: 'Hello! I reviewed the trip details. Is this for 6 guests?',
        time: '09:12 AM',
    },
    {
        id: 'm2',
        fromMe: true,
        body: 'Yes, 6 guests. Departure from Miami Beach Marina at 9:00 AM.',
        time: '09:15 AM',
    },
    {
        id: 'm3',
        fromMe: false,
        body: 'Perfect. I can confirm availability for Saturday.',
        time: '09:16 AM',
    },
    {
        id: 'm4',
        fromMe: true,
        body: 'Great. I will share the final charter notes and agreement shortly.',
        time: '09:18 AM',
    },
];

export default function MessagesPage() {
    return (
        <>
            <Head title="Messages" />

            <div className="flex h-full flex-1 flex-col overflow-hidden bg-[#F6FDFF] px-4 py-5 sm:px-6 lg:px-8">
                <div className="mx-auto flex h-full w-full max-w-[1440px] overflow-hidden rounded-3xl border border-[#d8e7ef] bg-white shadow-[0_18px_40px_rgba(17,57,93,0.08)]">
                    <aside className="flex w-full shrink-0 flex-col border-r border-[#e4edf3] md:w-[320px]">
                        <div className="border-b border-[#e4edf3] px-5 py-4">
                            <p className="text-xs font-semibold tracking-[0.2em] text-[#7b92a7] uppercase">
                                Inbox
                            </p>
                            <h2 className="mt-1 text-xl font-semibold text-[#0c304d]">
                                Conversations
                            </h2>
                            <div className="relative mt-4">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8ea3b5]" />
                                <input
                                    type="text"
                                    placeholder="Search by name or role"
                                    className="w-full rounded-xl border border-[#d7e5ee] bg-[#f9fcfe] py-2.5 pl-9 pr-3 text-sm text-[#234560] placeholder:text-[#92a4b3] focus:border-[#0d314d] focus:outline-none focus:ring-2 focus:ring-[#b9d3e5]"
                                />
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-3">
                            {conversations.map((conversation) => {
                                const isActive =
                                    conversation.id === activeConversation.id;

                                return (
                                    <button
                                        key={conversation.id}
                                        type="button"
                                        className={`mb-2 flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-colors ${
                                            isActive
                                                ? 'bg-[#eaf4fb]'
                                                : 'hover:bg-[#f4f9fc]'
                                        }`}
                                    >
                                        <span className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0d314d] text-sm font-semibold text-white">
                                            {conversation.name
                                                .split(' ')
                                                .slice(0, 2)
                                                .map((part) => part[0])
                                                .join('')}
                                            {conversation.online ? (
                                                <Circle className="absolute -right-0.5 -bottom-0.5 h-3.5 w-3.5 fill-[#22c55e] text-white" />
                                            ) : null}
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

                                        {conversation.unread > 0 ? (
                                            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#0d314d] px-1.5 text-[11px] font-semibold text-white">
                                                {conversation.unread}
                                            </span>
                                        ) : null}
                                    </button>
                                );
                            })}
                        </div>
                    </aside>

                    <section className="hidden min-w-0 flex-1 flex-col md:flex">
                        <header className="flex items-center border-b border-[#e4edf3] px-6 py-4">
                            <div className="flex items-center gap-3">
                                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#0d314d] text-sm font-semibold text-white">
                                    JM
                                </span>
                                <span>
                                    <span className="block text-sm font-semibold text-[#0c304d]">
                                        {activeConversation.name}
                                    </span>
                                    <span className="block text-xs text-[#6f8599]">
                                        Active now
                                    </span>
                                </span>
                            </div>
                        </header>

                        <div className="flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(circle_at_top,#f6fbff_0%,#ffffff_58%)] px-6 py-5">
                            {chatMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`flex ${
                                        message.fromMe
                                            ? 'justify-end'
                                            : 'justify-start'
                                    }`}
                                >
                                    <article
                                        className={`max-w-[78%] rounded-2xl px-4 py-3 shadow-sm ${
                                            message.fromMe
                                                ? 'rounded-br-md bg-[#0d314d] text-white'
                                                : 'rounded-bl-md border border-[#dbe9f1] bg-white text-[#28465f]'
                                        }`}
                                    >
                                        <p className="text-sm leading-relaxed">
                                            {message.body}
                                        </p>
                                        <p
                                            className={`mt-1 text-[11px] ${
                                                message.fromMe
                                                    ? 'text-[#c7d8e6]'
                                                    : 'text-[#7f95a8]'
                                            }`}
                                        >
                                            {message.time}
                                        </p>
                                    </article>
                                </div>
                            ))}
                        </div>

                        <footer className="border-t border-[#e4edf3] bg-white px-6 py-4">
                            <div className="flex items-center gap-2 rounded-2xl border border-[#d7e5ee] bg-[#f9fcfe] p-2">
                                <button
                                    type="button"
                                    className="rounded-xl p-2 text-[#6c8398] transition-colors hover:bg-[#ebf4fa] hover:text-[#0d314d]"
                                >
                                    <Paperclip className="h-4 w-4" />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Write a message..."
                                    className="h-10 flex-1 bg-transparent px-1 text-sm text-[#1f415c] placeholder:text-[#8fa3b3] focus:outline-none"
                                />
                                <button
                                    type="button"
                                    className="inline-flex items-center gap-1 rounded-xl bg-[#0d314d] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#123c5e]"
                                >
                                    Send
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
    breadcrumbs: [
        {
            title: 'Messages',
            href: messages(),
        },
    ],
    pageHeader: {
        title: 'Messages',
        description: 'Coordinate with captains, deckhands, and charterers in one place.',
    },
};
