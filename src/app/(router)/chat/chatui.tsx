"use client";

import { MemoizedReactMarkdown } from "@/app/_components/markdown";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import { useChat, experimental_useObject as useObject } from 'ai/react';
import { motion } from 'framer-motion';
import { Send } from "lucide-react";
import { Session } from "next-auth";
import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { SyncLoader } from "react-spinners";
import { z } from 'zod';
import { EnhancedTextarea } from "./enhanced-textarea";

const questionsSchema = z.array(z.object({ id: z.string(), question: z.string() }));
const ES_SERVICE_URL = process.env.NEXT_PUBLIC_ES_SERVICE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ChatUI({ context, session, user }: { context: string, session: Session, user: any }) {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    const messagesEndRef = React.useRef<HTMLDivElement>(null);
    const heightOfMostRecentMessage = useRef<number>(0);
    const { object, submit, isLoading: qLoading } = useObject({
        api: '/api/questions',
        schema: z.object({ questions: questionsSchema }),
    });
    const requestBody = useRef({ user: JSON.stringify(session.user + user), context: context, query: '' });
    const { messages, input, handleSubmit, handleInputChange, isLoading, setInput, append } =
    useChat({
        api: `${ES_SERVICE_URL}/api/chat?protocol=text`,
        streamProtocol: 'text',
        headers: {
            'Content-Type': 'application/json',
        },
        body: requestBody.current,
        initialInput: '',
        initialMessages: [
            { id: '1', role: 'system', content: `Hello ${session.user.name ?? "there"}! I\'m the Sickle Sense assistant, loaded with over 25,000 sickle cell articles, books, and organization blogs. Let me know how I can help you today!` },
        ],
    });

    useEffect(() => {
        if (requestBody.current) {
            requestBody.current = { user: JSON.stringify(session.user), context: context, query: input.length > 0 ? input : '' };
        }   
    }, [input, context, session.user]);
    
    // const obj = { user: JSON.stringify(session.user), context: context, query: input.length > 0 ? input : '' };
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSuggestionClick = (suggestion: string) => () => {
        append({ role: 'user', content: suggestion }, { allowEmptySubmit: false, body: { ...requestBody.current, query: suggestion } });
    }

    const messageVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    useLayoutEffect(() => {
        submit(`${JSON.stringify(session)}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleScroll = () => {
        if (messagesEndRef.current) {
            const currentHeight = messagesEndRef.current.getBoundingClientRect().height;
            if (currentHeight !== heightOfMostRecentMessage.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
                heightOfMostRecentMessage.current = currentHeight;
            }
        }
    }

    useEffect(() => {
        handleScroll();
    }, [messages]);

    return (
        <div className="px-4 py-2 space-y-4 pb-32">
            {messages.map((message, index) => (
                <motion.div
                    key={index}
                    initial="hidden"
                    animate="visible"
                    variants={messageVariants}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                    {message.role !== 'user' && (
                        <Avatar className="mr-2 flex-shrink-0">
                            <AvatarImage src="/lol.jpg" alt="Bot Avatar" />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                    )}
                    <motion.div
                        className={`rounded-lg p-3 max-w-[70%] ${message.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                            }`}
                    >
                        <p className="text-sm">
                            <MemoizedReactMarkdown
                                components={{
                                    p: ({ children }) => <p className="text-sm">{children}</p>,
                                    a: ({ children, href, ...props }) => (
                                        <a href={href} target="_blank" rel="noreferrer" className="text-purple-500 underline" {...props}>
                                            {children}
                                        </a>
                                    ),
                                }}
                            >
                                {message.content}
                            </MemoizedReactMarkdown>
                        </p>
                    </motion.div>
                    {message.role === 'user' && (
                        <Avatar className="ml-2 flex-shrink-0">
                            <AvatarImage src="https://avatars.githubusercontent.com/u/46255836?v=4" alt="Nyuma Avatar" />
                            <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                    )}
                </motion.div>
            ))}
            <div ref={messagesEndRef} />
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background">
                {/* Suggestions */}
                {qLoading ? (
                    <div className={cn(
                        sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
                        "pb-4 flex justify-center mx-auto"
                    )}>
                        <div className="flex justify-center">
                            <SyncLoader color="#9933ff" />
                        </div>
                    </div>
                ) : (
                    <>
                        {messages.length < 2 && (
                            <div className={cn(
                                sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72",
                                "pb-4 flex justify-center mx-auto"
                            )}>
                                <div className="grid grid-cols-2 gap-3 mx-auto">
                                    {object?.questions?.map((question) => (
                                        <Button
                                            key={question?.id}
                                            variant="secondary"
                                            onClick={handleSuggestionClick(question?.question ?? '')}
                                            className="p-1 bg-secondary/70 shadow-md ring-primary rounded-lg hover:bg-secondary-hover text-xs text-secondary-foreground"
                                        >
                                            {question?.question}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
                <form className={cn("flex space-x-2 mx-auto", sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72")} onSubmit={handleSubmit}>
                    <div className="flex flex-grow items-center space-x-2">
                        <EnhancedTextarea
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            className="flex-grow min-h-[40px] max-h-[200px] resize-y mx-8"
                            onSubmit={handleSubmit}
                            disabled={isLoading}
                        />
                        <Button type="submit" variant="secondary" disabled={isLoading}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}