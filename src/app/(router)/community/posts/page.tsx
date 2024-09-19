import Link from "next/link";

import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import PlaceholderContent from "@/app/_components/place";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { AllPosts } from "./all-posts";
import { PostsProvider } from "./context";
export default function PostsPage() {
  return (
    <ContentLayout title="All Posts">
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
            <BreadcrumbPage>Posts</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
          <div className="my-4">
              <h1 className="mb-4 text-2xl font-bold">Community Posts</h1>
            <AllPosts />
          </div>
    </ContentLayout>
  );
}
