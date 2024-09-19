"use client";

import { z } from "zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { usePosts } from "../context";
import { Post } from "../post";

const formSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(100, "Title must not exceed 100 characters"),
    content: z.string().min(10, "Content must be at least 10 characters").max(1000, "Content must not exceed 1000 characters"),
});

interface NewPostPageProps {
    onAddPost: (post: {
        id: string;
        title: string;
        content: string;
        likes: number;
        replies: number;
        date: Date;
    }) => void;
}

export default function NewPostPage() {
    const router = useRouter();
    const { addPost } = usePosts();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            content: "",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const newPost: Post = {
            id: Date.now().toString(),
            title: values.title,
            content: values.content,
            likes: 0,
            replies: [],
            date: new Date(),
            author: "Current User", // Replace with actual user data
            avatar: "https://avatars.githubusercontent.com/u/46255836?v=4", // Replace with actual user avatar
        };
        addPost(newPost);
        router.push('/community/posts');
    }

    return (
        <ContentLayout title="New Post">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/">Home</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/community/posts">Posts</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>New</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="my-4">
                <h1 className="mb-4 text-2xl font-bold">Create New Post</h1>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter post title" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Content</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Enter post content" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Create Post</Button>
                    </form>
                </Form>
            </div>
        </ContentLayout>
    );
}