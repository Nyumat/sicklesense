'use client';

import { useChat } from 'ai/react';
import { useSession } from 'next-auth/react';
import { Card } from './custom-card';

export default function Page() {
    const { messages, input, handleSubmit, handleInputChange, isLoading } =
        useChat({
            api: 'http://localhost:8000/api/chat?protocol=text',
            streamProtocol: 'text',
            initialInput: '',
            initialMessages: [
                { id: '1', role: 'system', content: `Hello {Tom}! I\'m an A.I. chatbot fine tuned on over 25,000 sickle cell articles, books, and papers. Feel free to ask me anything.` },
            ],
        });

    return (
        <div className="flex flex-col gap-2">
            <div className="flex flex-col p-4 gap-2">
                {messages.map(message => (
                    <div key={message.id} className="flex flex-row gap-2">
                        <div className="w-24 text-zinc-500 flex-shrink-0">{`${message.role}: `}</div>
                        <div className="flex flex-col gap-2">{message.content}</div>
                    </div>
                ))}
            </div>

            {messages.length === 0 && <Card type="chat-text" />}

            <form
                onSubmit={handleSubmit}
                className="flex flex-col fixed bottom-0 w-full border-t"
            >
                <input
                    value={input}
                    placeholder="Why is the sky blue?"
                    onChange={handleInputChange}
                    className="w-full p-4 outline-none bg-transparent"
                    disabled={isLoading}
                />
            </form>
        </div>
    );
}