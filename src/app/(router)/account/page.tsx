"use client";

import Link from "next/link";
import { DynamicForm } from "@/app/_components/reusable-form";
import { formSchema } from "@/app/data"
import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import PlaceholderContent from "@/app/_components/place";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
;

export default function AccountPage() {
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
      <div className="my-4">
        <h1 className="text-2xl font-bold mb-4">Your Account</h1>
    <DynamicForm 
          schema={formSchema} 
          onSubmit={() => console.log("hi")}

          />
          </div>
    </ContentLayout>
  );
}
