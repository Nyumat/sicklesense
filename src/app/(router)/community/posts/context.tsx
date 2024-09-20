"use client";

import React, { createContext, useContext, useState } from 'react';
import tour from '../../dashboard/(helper)/tour-producer';
import { Post, Reply } from './post';

interface PostsContextType {
    posts: Post[];
    addPost: (post: Post) => void;
    getPost: (id: string) => Post | undefined;
    addReply: (postId: string, reply: Reply) => void;
}

const PostsContext = createContext<PostsContextType | undefined>(undefined);

export function PostsProvider({ children }: { children: React.ReactNode }) {
    const [posts, setPosts] = useState<Post[]>([]);

    const addPost = (newPost: Post) => {
        setPosts((prevPosts) => [newPost, ...prevPosts]);
    };

    const getPost = (id: string) => {
        return posts.find((post) => post.id === id);
    }

    const addReply = (postId: string, reply: Reply) => {
        setPosts((prevPosts) => {
            return prevPosts.map((post) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        replies: [...(post.replies || []), reply],
                    };
                }
                return post;
            });
        });
    }

    return (
        <PostsContext.Provider value={{ posts, addPost, getPost, addReply }}>
            <tour.TourProvider>
                {children}
            </tour.TourProvider>
        </PostsContext.Provider>
    );
}

export function usePosts() {
    const context = useContext(PostsContext);
    if (context === undefined) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
}