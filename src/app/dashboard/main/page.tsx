"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Activity, AlertCircle, Calendar, Droplet, MessageCircle, Pill, ThermometerSun } from "lucide-react"
import { useState } from "react"
import { Bar, BarChart, Line, LineChart, Pie, PieChart, RadialBar, RadialBarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const hemoglobinData = [
  { name: "Jan", level: 8.5 },
  { name: "Feb", level: 9.2 },
  { name: "Mar", level: 8.8 },
  { name: "Apr", level: 9.5 },
  { name: "May", level: 9.1 },
  { name: "Jun", level: 8.7 },
]

const painData = [
  { name: "Mon", level: 3 },
  { name: "Tue", level: 2 },
  { name: "Wed", level: 4 },
  { name: "Thu", level: 3 },
  { name: "Fri", level: 5 },
  { name: "Sat", level: 2 },
  { name: "Sun", level: 1 },
]

const hydrationData = [
  { name: "Current", value: 75 },
]

const oxygenSaturationData = [
  { name: "12 AM", value: 95 },
  { name: "4 AM", value: 94 },
  { name: "8 AM", value: 96 },
  { name: "12 PM", value: 97 },
  { name: "4 PM", value: 95 },
  { name: "8 PM", value: 96 },
]

const medicationAdherenceData = [
  { name: "Taken", value: 85 },
  { name: "Missed", value: 15 },
]

const symptomsData = [
  { name: "Fatigue", value: 4 },
  { name: "Joint Pain", value: 3 },
  { name: "Shortness of Breath", value: 2 },
  { name: "Headache", value: 1 },
]

export default function Component() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
      <div className="flex flex-col h-screen">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Sickle Cell Companion</h1>
        <Avatar>
          <AvatarImage src="/placeholder-user.jpg" alt="User" />
          <AvatarFallback>SC</AvatarFallback>
        </Avatar>
      </header>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-grow">
          <TabsList className="flex flex-col items-start space-y-2">
            <TabsTrigger value="overview" className="w-full justify-start">Overview</TabsTrigger>
            <TabsTrigger value="charts" className="w-full justify-start">Health Metrics</TabsTrigger>
            <TabsTrigger value="medications" className="w-full justify-start">Medications</TabsTrigger>
            <TabsTrigger value="appointments" className="w-full justify-start">Appointments</TabsTrigger>
            <TabsTrigger value="chat" className="w-full justify-start">Chat</TabsTrigger>
            <TabsTrigger value="tips" className="w-full justify-start">Health Tips</TabsTrigger>
          </TabsList>
        </Tabs>
        <main className="flex-1 p-6 overflow-y-auto">
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                    <p className="text-xs text-muted-foreground">Drink 500ml more water</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Oxygen Saturation</CardTitle>
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
                  <p>Your hemoglobin levels are stable. Remember to stay hydrated and take your medications as prescribed. If you experience any unusual symptoms, please contact your healthcare provider.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="charts" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Hemoglobin Levels</CardTitle>
                    <CardDescription>Last 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={hemoglobinData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line type="monotone" dataKey="level" stroke="#8884d8" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Pain Levels</CardTitle>
                    <CardDescription>Last 7 days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={painData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="level" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Hydration Level</CardTitle>
                    <CardDescription>Current status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <RadialBarChart 
                        innerRadius="60%" 
                        outerRadius="80%" 
                        data={hydrationData} 
                        startAngle={180} 
                        endAngle={0}
                      >
                        <RadialBar minAngle={15} background clockWise={true} dataKey="value" />
                      </RadialBarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Oxygen Saturation</CardTitle>
                    <CardDescription>Last 24 hours</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={oxygenSaturationData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="medications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Medication Tracker</CardTitle>
                  <CardDescription>Your daily medication schedule</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Hydroxyurea</p>
                        <p className="text-sm text-muted-foreground">500mg, Once daily</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Pill className="mr-2 h-4 w-4" />
                        Mark as Taken
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Folic Acid</p>
                        <p className="text-sm text-muted-foreground">1mg, Once daily</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Pill className="mr-2 h-4 w-4" />
                        Mark as Taken
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Medication Adherence</CardTitle>
                  <CardDescription>Last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={medicationAdherenceData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="appointments" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Hematologist Check-up</p>
                        <p className="text-sm text-muted-foreground">Dr. Smith, June 15, 2023 at 10:00 AM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Blood Test</p>
                        <p className="text-sm text-muted-foreground">Lab Corp, June 22, 2023 at 9:00 AM</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="chat" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Chat with Your Care Team</CardTitle>
                  <CardDescription>Recent conversations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>DN</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Dr. Novak</p>
                        <p className="text-sm text-muted-foreground">
                          Your latest test results look good. Keep up the great work!
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4">
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>NP</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">Nurse Patel</p>
                        <p className="text-sm text-muted-foreground">
                          Don&apos;t forget to log your pain levels daily. It helps us track your progress.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex items-center space-x-2">
                <input
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Type your message..."
                />
                <Button size="icon">
                  <MessageCircle className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="tips" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Health Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Stay hydrated: Aim for at least 8-10 glasses of water daily.</li>
                    <li>Avoid extreme temperatures: Dress appropriately for the weather.</li>
                    <li>Get enough rest: Aim for 7-9 hours of sleep each night.</li>
                    <li>Exercise regularly: Light to moderate exercise can help improve circulation.</li>
                    <li>Manage stress: Practice relaxation techniques like deep breathing or meditation.</li>
                  </ul>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Symptom Tracker</CardTitle>
                  <CardDescription>Log your symptoms to share with your care team</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={symptomsData} layout="vertical">
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                  <Button className="w-full mt-4">
                    <AlertCircle className="mr-2 h-4 w-4" />
                    Log New Symptom
                  </Button>
                </CardContent>
              </Card>
          </TabsContent>
          </main>
        </div>
      </Tabs>
    </div>
  )
}