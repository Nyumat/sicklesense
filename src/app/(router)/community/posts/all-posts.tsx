"use client";

import React, { useState, useEffect, useMemo } from "react";
import { PostCard, Post, Reply } from "./post";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useDebounce } from "use-debounce";
import { faker } from "@faker-js/faker";
import { useInView } from "react-intersection-observer";
import Fuse from 'fuse.js';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePosts } from "./context";

function generateNonLoremParagraph(numSentences: number) {
    let paragraph = "";
    for (let i = 0; i < numSentences; i++) {
        let sentence = faker.word.sample()
        sentence = sentence.charAt(0).toUpperCase() + sentence.slice(1);
        paragraph += sentence + " ";
    }
    return paragraph.trim();
}

const generateFakePosts = (count: number): Post[] => {
    const posts: Post[] = [];
    for (let i = 0; i < count; i++) {
        const post: Post = {
            id: faker.string.uuid(),
            title: faker.lorem.sentence(),
            content: generateNonLoremParagraph(faker.number.int({ min: 1, max: 5 })),
            date: faker.date.recent(),
            likes: faker.number.int({ min: 0, max: 100 }),
            replies: [],
            author: faker.person.firstName(),
            avatar: faker.image.avatar(),
        };
        posts.push(post);
        for (let j = 0; j < faker.number.int({ min: 0, max: 5 }); j++) {
            const reply: Reply = {
                id: faker.string.uuid(),
                content: generateNonLoremParagraph(faker.number.int({ min: 1, max: 5 })),
                date: faker.date.recent(),
                author: faker.person.firstName(),
                avatar: faker.image.avatar(),
                replies: [],
            };
            post.replies?.push(reply);
        }
    }
    return posts;
};

const POSTS_PER_LOAD = 5;

export function AllPosts() {
    const { posts } = usePosts();
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
    const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
    const [hasMore, setHasMore] = useState(true);

    const { ref, inView } = useInView({
        threshold: 0,
    });

    const fuse = useMemo(() => new Fuse(posts, {
        keys: ['title', 'content', 'author'],
        threshold: 0.3,
        includeScore: true,
    }), [posts]);

    const filteredPosts = useMemo(() => {
        if (!debouncedSearchTerm) return posts;
        return fuse.search(debouncedSearchTerm).map(result => result.item);
    }, [posts, debouncedSearchTerm, fuse]);

    useEffect(() => {
        setDisplayedPosts(filteredPosts.slice(0, POSTS_PER_LOAD));
        setHasMore(filteredPosts.length > POSTS_PER_LOAD);
    }, [filteredPosts]);

    useEffect(() => {
        if (inView && hasMore) {
            const nextPosts = filteredPosts.slice(
                displayedPosts.length,
                displayedPosts.length + POSTS_PER_LOAD
            );
            setDisplayedPosts((prevPosts) => [...prevPosts, ...nextPosts]);
            setHasMore(displayedPosts.length + nextPosts.length < filteredPosts.length);
        }
    }, [inView, hasMore, filteredPosts, displayedPosts]);

    return (
        <div className="space-y-6 md:p-6 bg-secondary rounded-lg shadow-inner">
            <div className="flex justify-between items-center">
                <div className="relative flex-grow mr-4">
                    <Input
                        type="text"
                        placeholder="Search posts..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-input focus:border-ring focus:ring focus:ring-ring focus:ring-opacity-50 transition duration-300"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                </div>
                <Link href="/community/posts/new">
                    <Button variant="outline" className="flex items-center">
                        <Plus className="mr-2 h-4 w-4" /> New Post
                    </Button>
                </Link>
            </div>

            <AnimatePresence>
                {displayedPosts.map((post) => (
                    <motion.div
                        key={post.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <PostCard post={post} />
                    </motion.div>
                ))}
            </AnimatePresence>

            {filteredPosts.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-muted-foreground py-8"
                >
                    No posts found. Try a different search term.
                </motion.div>
            )}

            {hasMore && (
                <div ref={ref} className="h-10 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="loader"
                    >
                        Loading more posts...
                    </motion.div>
                </div>
            )}
        </div>
    );
}