import Link from "next/link";
import { ContentLayout } from "@/app/_components/admin-panel/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Greeting } from "@/app/(router)/dashboard/(helper)/greeting";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Droplet,
  Activity,
  ThermometerSun,
  Bell,
  Mail,
  Search,
  PenSquare,
  ChevronRight,
} from "lucide-react";

export default function DashboardPage() {
  const heartRateData = [
    { time: "12am", rate: 65 },
    { time: "3am", rate: 60 },
    { time: "6am", rate: 62 },
    { time: "9am", rate: 75 },
    { time: "12pm", rate: 85 },
    { time: "3pm", rate: 70 },
    { time: "6pm", rate: 80 },
    { time: "9pm", rate: 72 },
    { time: "9am", rate: 75 },
    { time: "12pm", rate: 85 },
    { time: "6pm", rate: 80 },
    { time: "9pm", rate: 72 },
    { time: "3pm", rate: 70 },
  ];
  return (
    <ContentLayout title="Dashboard">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col justify-between md:flex-row">
        <Greeting />
        <header className="flex items-center justify-between pb-4">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 -translate-y-1/2 transform pr-1 text-gray-400" />
            <Input className="min-w-80 pl-8" placeholder="Search anything..." />
          </div>
          <div className="ml-4 flex items-center space-x-2">
            <Button variant="ghost" size="icon">
              <Bell />
            </Button>
            <Button variant="ghost" size="icon">
              <Mail />
            </Button>
          </div>
        </header>
      </div>
      <div className="mb-2 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hemoglobin</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">9.1 g/dL</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pain Level</CardTitle>
            <ThermometerSun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 / 10</div>
            <p className="text-xs text-muted-foreground">Last updated 2h ago</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Hydration</CardTitle>
            <Droplet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">75%</div>
            <p className="text-xs text-muted-foreground">
              Drink 500ml more water
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Oxygen Saturation
            </CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">Within normal range</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Today&apos;s Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Your hemoglobin levels are stable. Remember to stay hydrated and
            take your medications as prescribed. If you experience any unusual
            symptoms, please contact your healthcare provider.
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-3 gap-2 py-2">
        <Card className="bg-blue-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Heart Rate</CardTitle>
            <Button variant="ghost" size="icon" className="text-white">
              <PenSquare className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">65 BPM</div>
            <div className="h-[80px]">
              {/* Heart rate graph placeholder */}
              <div className="flex h-full w-full items-end space-x-1">
                {heartRateData.map((data, index) => (
                  <div
                    key={index}
                    className="w-[8%] bg-blue-300"
                    style={{ height: `${(data.rate / 100) * 100}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-red-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Blood Pressure
            </CardTitle>
            <Button variant="ghost" size="icon" className="text-white">
              <PenSquare className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">120 mmHg</div>
            <div className="flex h-[80px] items-center justify-center">
              {/* Blood pressure icon placeholder */}
              <div className="h-12 w-12 rounded-full border-4 border-white"></div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-teal-500 text-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sleep</CardTitle>
            <Button variant="ghost" size="icon" className="text-white">
              <PenSquare className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">87%</div>
            <div className="h-[80px]">
              {/* Sleep graph placeholder */}
              <div className="flex h-full w-full items-end space-x-1">
                {[70, 80, 60, 90, 75, 85, 80].map((value, index) => (
                  <div
                    key={index}
                    className="w-[12%] bg-teal-300"
                    style={{ height: `${value}%` }}
                  ></div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Wellness AI Chatbot */}
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Wellness AI Chatbot
            <Button variant="ghost" size="sm">
              SEE ALL
            </Button>
          </CardTitle>
          <CardDescription>512 CONVERSATIONS</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-lg bg-blue-100 p-4">
              <p className="text-blue-800">
                Let&apos;s make it easier for you to monitor your nutrition.
              </p>
              <p className="mt-2 text-blue-800">
                I&apos;ll set up a food diary for you to record your meals and
                snacks! 🍎🥗
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Input placeholder="Reply to AI chatbot..." />
              <Button size="icon" className="bg-blue-500 text-white">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </ContentLayout>
  );
}
