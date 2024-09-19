"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { usePosts } from "../context";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { MessageSquare, ThumbsUp, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Reply } from "../post";

export default function SinglePostPage() {
    const params = useParams<{ id: string }>();
    const { getPost, addReply } = usePosts();
    const [replyContent, setReplyContent] = useState("");
    const [replyToId, setReplyToId] = useState<string | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const post = getPost(params.id);

    if (!post) {
        return <div className="text-center p-8">Post not found</div>;
    }

    const handleReply = () => {
        if (replyContent.trim()) {
            // addReply: (postId: string, reply: Reply) => void;
            addReply(post.id, {
                id: Date.now().toString(),
                content: replyContent,
                date: new Date(),
            author: "You",
            avatar: "/images/avatar.jpg",
            replies: [],
            })

            setReplyContent("");
            setReplyToId(null);
            setIsDrawerOpen(false);
        }
    };

    const ReplyComponent = ({ reply, depth = 0 }: { reply: Reply; depth?: number }) => (
        <Card className={`mt-4 ml-${depth * 4}`}>
            <CardHeader className="flex flex-row items-center space-x-4">
                <Avatar>
                    <AvatarImage src={reply.avatar} alt={reply.author} />
                    <AvatarFallback>{reply.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                    <h4 className="font-semibold">{reply.author}</h4>
                    <p className="text-sm text-muted-foreground">
                        {format(new Date(reply.date), "MMM d, yyyy 'at' HH:mm")}
                    </p>
                </div>
            </CardHeader>
            <CardContent>
                <p>{reply.content}</p>
            </CardContent>
            <CardFooter>
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                        setReplyToId(reply.id);
                        setIsDrawerOpen(true);
                    }}
                >
                    Reply
                </Button>
            </CardFooter>
            {reply.replies && reply.replies.map(subReply => (
                <ReplyComponent key={subReply.id} reply={subReply} depth={depth + 1} />
            ))}
        </Card>
    );

    return (
        <div className="max-w-3xl mx-auto p-6">
            <Card className="mb-8">
                <CardHeader className="flex flex-row items-center space-x-4">
                    <Avatar className="h-14 w-14">
                        <AvatarImage src={post.avatar} alt={post.author} />
                        <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                        <h1 className="text-3xl font-bold">{post.title}</h1>
                        <p className="text-sm text-muted-foreground">
                            Posted by {post.author} on {format(new Date(post.date), "MMM d, yyyy 'at' HH:mm")}
                        </p>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-lg">{post.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex space-x-4 text-sm text-muted-foreground">
                        <span className="flex items-center">
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {post.likes} likes
                        </span>
                        <span className="flex items-center">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {post.replies?.length || 0} replies
                        </span>
                        <span className="flex items-center">
                            <Calendar className="mr-1 h-4 w-4" />
                            {format(new Date(post.date), "MMM d, yyyy")}
                        </span>
                    </div>
                    <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                        <DrawerTrigger asChild>
                            <Button>Reply to Post</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Reply to {replyToId ? 'Comment' : 'Post'}</DrawerTitle>
                            </DrawerHeader>
                            <div className="p-4 space-y-4">
                                <Textarea
                                    placeholder="Write your reply here..."
                                    value={replyContent}
                                    onChange={(e) => setReplyContent(e.target.value)}
                                    rows={5}
                                />
                                <Button onClick={handleReply}>Submit Reply</Button>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </CardFooter>
            </Card>

            <h2 className="text-2xl font-semibold mb-4">Replies</h2>
            {post.replies && post.replies.map(reply => (
                <ReplyComponent key={reply.id} reply={reply} />
            ))}
        </div>
    );
}