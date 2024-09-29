"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import { useChat } from 'ai/react';
import { motion } from 'framer-motion';
import { Send } from "lucide-react";
import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { EnhancedTextarea } from "./enhanced-textarea";
import { useSession } from "next-auth/react";

const ES_SERVICE_URL = process.env.NEXT_PUBLIC_ES_SERVICE_URL;

export function ChatUI() {
    const session = useSession();
    const sidebar = useStore(useSidebarToggle, (state) => state);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const heightOfMostRecentMessage = useRef<number>(0);
    const { messages, input, handleSubmit, handleInputChange, isLoading } =
        useChat({
            api: `${ES_SERVICE_URL}/api/chat?protocol=text`,
            streamProtocol: 'text',
            initialInput: '',
            initialMessages: [
                { id: '1', role: 'system', content: `Hello ${session.data?.user.name ?? "there"}! I\'m the Sickle Sense assistant, fine tuned on over 25,000 sickle cell articles, books, and organization blogs. Let me know how I can help you today!` },
            ],
        });

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
    });

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
                        <ReactMarkdown className="break-words whitespace-pre-wrap">
                            {message.content.toString()}
                        </ReactMarkdown>
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
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background shadow-inner">
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