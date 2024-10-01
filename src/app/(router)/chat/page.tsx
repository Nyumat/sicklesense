import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ChatUI } from "./chatui";
import { db } from "@/server/db";

export default async function ChatPage() {
    const patientProfileContext = await api.users.gatherContext();
    const context = JSON.stringify(patientProfileContext);
    const session = await getServerAuthSession();
    const user = await db.user.findFirst({
        where: {
            email: session?.user.email,
        },
    });
    if (!session) {
        redirect("/auth/signin");
    }
    return (
        <ContentLayout title="Chat">
            <Breadcrumb className="mb-4">
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
                        <BreadcrumbPage>Chat</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="max-h-96 h-full container my-6 bg-dot-muted">
                <ChatUI context={context} session={session} user={user} />
            </div>
        </ContentLayout>
    );
}