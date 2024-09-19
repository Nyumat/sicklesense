"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MessageSquare, ThumbsUp } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";


export interface Reply {
    id: string;
    content: string;
    author: string;
    avatar: string;
    date: Date;
    replies?: Reply[];
}

export interface Post {
    id: string;
    title: string;
    content: string;
    author: string;
    avatar: string;
    date: Date;
    likes: number;
    replies?: Reply[];
}

export function PostCard({ post }: { post: Post }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Card
                key={post.id}
                className="mb-6 overflow-hidden bg-gradient-to-br from-background to-secondary shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02]"
            >
                <CardHeader className="flex flex-row items-center space-x-4 bg-secondary p-4">
                    <Avatar className="h-14 w-14 ring-2 ring-primary/20 transition-all duration-300 hover:ring-4">
                        <AvatarImage src={post.avatar} alt={post.author} />
                        <AvatarFallback className="bg-primary text-primary-foreground">{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow">
                        <CardTitle className="text-2xl font-bold text-primary">
                            <Link
                                href={`/community/posts/${post.id}`}
                                className="transition-colors duration-200 hover:text-highlight"
                            >
                                {post.title}
                            </Link>
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                            Posted by {post.author} on {format(post.date, "MMM d, yyyy")}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <p className="text-foreground line-clamp-3">{post.content}</p>
                </CardContent>
                <CardFooter className="bg-secondary p-4">
                    <div className="flex w-full justify-between text-sm text-muted-foreground">
                        {[
                            { icon: MessageSquare, label: "replies", value: post.replies },
                            { icon: ThumbsUp, label: "likes", value: post.likes },
                            { icon: Calendar, label: "date", value: format(post.date, "MMM d, yyyy") },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center space-x-1"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <item.icon className={cn("h-5 w-5", index === 1 && "text-highlight")} />
                                <span>{typeof item.value === 'number' ? `${item.value} ${item.label}` : Array.isArray(item.value) ? `${item.value.length} ${item.label}` : item.value}</span>
                            </motion.div>
                        ))}
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}