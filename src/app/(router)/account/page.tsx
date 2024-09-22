import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import { PersonalInfoForm } from "@/app/_components/forms";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/trpc/server";
import Link from "next/link";

export default async function AccountPage() {
    const personalInfo = await api.users.personalInfo()
    return (
        <ContentLayout title="Account">
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
                        <BreadcrumbPage>Account</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="container mx-auto my-6">
                <h1 className="mb-4 text-2xl font-bold">Your Account</h1>
                <Card className="max-w-xl w-full">
                    <CardHeader>
                        <CardTitle>Personal Information</CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <PersonalInfoForm info={personalInfo} />
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    );
}
