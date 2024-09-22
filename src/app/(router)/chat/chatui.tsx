"use client";

import { continueConversation } from '@/app/actions';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import { type CoreMessage } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { Send } from "lucide-react";
import React, { useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { EnhancedTextarea } from "./enhanced-textarea";


export function ChatUI() {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [messages, setMessages] = useState<CoreMessage[]>([]);
    const [input, setInput] = useState('');
    const [data, setData] = useState<any>({});

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newMessages: CoreMessage[] = [
            ...messages,
            { content: input, role: 'user' },
        ];

        setMessages(newMessages);
        setInput('');

        const result = await continueConversation(newMessages);
        setData(result.data);
        for await (const content of readStreamableValue(result.message)) {
            setMessages([
                ...newMessages,
                {
                    role: 'assistant',
                    content: content as string,
                },
            ]);
        }
    }

    return (
        <div className="px-4 py-2 space-y-4 pb-32">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                    {message.role !== 'user' && (
                        <Avatar className="mr-2 flex-shrink-0">
                            <AvatarImage src="/lol.jpg" alt="Bot Avatar" />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={`rounded-lg p-3 max-w-[70%] ${message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                            }`}
                    >
                        <ReactMarkdown className="break-words whitespace-pre-wrap">
                            {message.content.toString()}
                        </ReactMarkdown>
                    </div>
                    {message.role === 'user' && (
                        <Avatar className="ml-2 flex-shrink-0">
                            <AvatarImage src="https://avatars.githubusercontent.com/u/46255836?v=4" alt="Nyuma Avatar" />
                            <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))}
            <div ref={messagesEndRef} />
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background shadow-inner">
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
                <form className={cn("flex space-x-2 mx-auto", sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72")} onSubmit={async e => {
                    e.preventDefault();
                    const newMessages: CoreMessage[] = [
                        ...messages,
                        { content: input, role: 'user' },
                    ];

                    setMessages(newMessages);
                    setInput('');

                    const result = await continueConversation(newMessages);
                    setData(result.data);

                    for await (const content of readStreamableValue(result.message)) {
                        setMessages([
                            ...newMessages,
                            {
                                role: 'assistant',
                                content: content as string,
                            },
                        ]);
                    }
                }}>
                    <div className="flex flex-grow items-center space-x-2">
                        <EnhancedTextarea
                            value={input}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow min-h-[40px] max-h-[200px] resize-y mx-8"
                            onSubmit={handleSubmit}
                        />
                        <Button type="submit" variant="secondary">
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}