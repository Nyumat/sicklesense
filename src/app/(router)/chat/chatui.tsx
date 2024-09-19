"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Paperclip, Send, X, Eye } from "lucide-react";
import { cn } from '@/lib/utils';
import { useStore } from '@/hooks/use-store';
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'AI';
    timestamp: Date;
}

export function ChatUI() {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    const [messages, setMessages] = useState<Message[]>([
        { id: '1', content: "Hello! How can I help you today?", sender: 'AI', timestamp: new Date() },
        { id: '2', content: "Hi! I have a question about my account.", sender: 'user', timestamp: new Date() },
    ]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [rawFile, setRawFile] = useState<string | null>(null);
    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.item(0);
        if (file) {
            setSelectedFile(file);
            sanitize(file);
        }
    };

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message: Message = {
                id: Date.now().toString(),
                content: newMessage,
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages([...messages, message]);
            setNewMessage('');
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sanitize = (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setRawFile(reader.result as string);
        };
        reader.readAsDataURL(file);
    }

    return (
        <div className="px-4 py-2 space-y-4 pb-32">
            {messages.map((message) => (
                <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                    {message.sender === 'AI' && (
                        <Avatar className="mr-2">
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={`rounded-lg p-3 max-w-[70%] ${message.sender === 'user'
                            ? 'bg-[#18181B] text-white'
                            : 'bg-[#F4F4F5] text-black'
                            }`}
                    >
                        <p>{message.content}</p>
                        <span className="text-xs opacity-50 mt-1 block">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    {message.sender === 'user' && (
                        <Avatar className="ml-2">
                            <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))}
            <div ref={messagesEndRef} />
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background shadow-inner">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                    className={cn("flex space-x-2 mx-auto", sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72")}
                >
                    <div className="flex flex-grow items-center space-x-2">
                        <div className="relative w-24 h-24 mb-2">
                            {selectedFile && (
                                <>
                                    <div
                                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                                        onClick={() => setIsPreviewOpen(true)}
                                    >
                                        <Eye className="text-white" />
                                    </div>
                                    {rawFile && (
                                        <Image
                                            src={rawFile}
                                            layout="fill"
                                            objectFit="cover"
                                            alt="Selected file"
                                            className="rounded-md"
                                        />
                                    )}
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className='absolute -top-2 -right-2 rounded-full scale-75'
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setRawFile(null);
                                        }}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </>
                            )}
                        </div>
                        <Textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow min-h-[40px] max-h-[200px] resize-y mx-8"
                        />
                        <Input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/*,.pdf,.doc,.docx"
                            className="hidden"
                        />
                        <Button type="submit" variant="secondary">
                            <Send className="h-4 w-4" />
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            className="px-3"
                        >
                            <Paperclip className="h-4 w-4" />
                        </Button>
                    </div>
                </form>
            </div>
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <div className="relative w-full h-64">
                        {rawFile && (
                            <Image
                                src={rawFile}
                                layout="fill"
                                objectFit="contain"
                                alt="File preview"
                            />
                        )}
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                    >
                        Close
                    </Button>
                </DialogContent>
            </Dialog>
            <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <div className="relative w-full h-64">
                        {rawFile && (
                            <Image
                                src={rawFile}
                                layout="fill"
                                objectFit="contain"
                                alt="File preview"
                            />
                        )}
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        className="absolute top-2 right-2"
                        onClick={() => setIsPreviewOpen(false)}
                    >
                        <X className="h-4 w-4" />
                    </Button>
                </DialogContent>
            </Dialog>
        </div>
    );
}