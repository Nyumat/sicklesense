"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSidebarToggle } from '@/hooks/use-sidebar-toggle';
import { useStore } from '@/hooks/use-store';
import { cn } from '@/lib/utils';
import { useChat } from "ai/react";
import { Eye, Paperclip, Send, X } from "lucide-react";
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { EnhancedTextarea } from "./enhanced-textarea";

interface Message {
    id: string;
    content: string;
    sender: 'user' | 'AI';
    timestamp: Date;
}

export function ChatUI() {
    const sidebar = useStore(useSidebarToggle, (state) => state);
    const { messages, input, handleInputChange, handleSubmit } = useChat();
    // const [messages, setMessages] = useState<Message[]>([
    //     { id: '1', content: "Good afternoon! I noticed your heart rate was elevated earlier. How are you feeling now?", sender: 'AI', timestamp: new Date() },
    //     { id: '2', content: "I felt a bit of chest pain earlier, but it's gone now. Should I be worried?", sender: 'user', timestamp: new Date() },
    //     { id: '3', content: "It’s great to hear the pain has subsided. Since your hemoglobin levels were stable last week, it may not be a crisis, but I'll monitor for any further signs. Please keep me updated.", sender: 'AI', timestamp: new Date() },
    //     { id: '4', content: "Thanks! Also, I’ve had some trouble sleeping lately. Any suggestions?", sender: 'user', timestamp: new Date() },
    //     { id: '5', content: "It could be related to dehydration, which can worsen symptoms. Try increasing your water intake before bed. I can also send over some breathing exercises if you'd like.", sender: 'AI', timestamp: new Date() }
    // ]);
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

    // const handleSendMessage = () => {
    //     if (newMessage.trim()) {
    //         const message: Message = {
    //             id: Date.now().toString(),
    //             content: newMessage,
    //             sender: 'user',
    //             timestamp: new Date(),
    //         };
    //         setMessages([...messages, message]);
    //         setNewMessage('');
    //     }
    // };

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
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                >
                    {message.role !== 'user' && (
                        <Avatar className="mr-2">
                            <AvatarImage src="/lol.jpg" alt="Bot Avatar" />
                            <AvatarFallback>AI</AvatarFallback>
                        </Avatar>
                    )}
                    <div
                        className={`rounded-lg p-3 max-w-[70%] ${message.role === 'user'
                            ? 'bg-[#18181B] text-white'
                            : 'bg-[#F4F4F5] text-black'
                            }`}
                    >
                        <p>{message.content}</p>
                        <span className="text-xs opacity-50 mt-1 block">
                            {message.createdAt?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                    {message.role === 'user' && (
                        <Avatar className="ml-2">
                            <AvatarImage src="https://avatars.githubusercontent.com/u/46255836?v=4" alt="Nyuma Avatar" />
                            <AvatarFallback>You</AvatarFallback>
                        </Avatar>
                    )}
                </div>
            ))}
            <div ref={messagesEndRef} />
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background shadow-inner">
                <form className={cn("flex space-x-2 mx-auto", sidebar?.isOpen === false ? "lg:ml-[90px]" : "lg:ml-72")} onSubmit={handleSubmit}>
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
                        <EnhancedTextarea
                            value={input}
                            onChange={handleInputChange}
                            placeholder="Type your message..."
                            className="flex-grow min-h-[40px] max-h-[200px] resize-y mx-8"
                            onSubmit={handleSubmit}
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