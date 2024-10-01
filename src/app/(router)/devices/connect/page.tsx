import Link from "next/link";

import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FitbitConnectWidget } from "./(helper)/widget";

export default function DeviceConnectPage() {
    return (
        <ContentLayout title="Connect a Device">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Home</Link>
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
                            <Link href="/devices">Devices</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Connect a Device</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="container mx-auto my-6">
                <h1 className="text-3xl font-bold mb-6">
                    Connect a Device
                </h1>
                <p className="text-muted-foreground">
                    Connect a wearable device to start tracking your health data.
                </p>
                <FitbitConnectWidget />
            </div>
        </ContentLayout>
    );
}
