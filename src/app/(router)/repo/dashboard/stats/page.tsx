import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, Bell, Droplet, Sun } from "lucide-react";
// import {
//   CartesianGrid,
//   Line,
//   LineChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// const painData = [
//   { day: "Mon", level: 2 },
//   { day: "Tue", level: 3 },
//   { day: "Wed", level: 1 },
//   { day: "Thu", level: 4 },
//   { day: "Fri", level: 2 },
//   { day: "Sat", level: 1 },
//   { day: "Sun", level: 2 },
// ];

export default function SickleCellDashboard() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="mb-6 text-3xl font-bold">Sickle Cell Health Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Pain Tracker Widget */}
        <Card>
          <CardHeader>
            <CardTitle>Pain Tracker</CardTitle>
          </CardHeader>
          {/* <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={painData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="level" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent> */}
        </Card>

        {/* Medication Reminder Widget */}
        <Card>
          <CardHeader>
            <CardTitle>Medication Reminder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Hydroxyurea</span>
                <Button size="sm">
                  <Bell className="mr-2 h-4 w-4" /> 9:00 AM
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Folic Acid</span>
                <Button size="sm">
                  <Bell className="mr-2 h-4 w-4" /> 1:00 PM
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <span>Pain Medication</span>
                <Button size="sm">
                  <Bell className="mr-2 h-4 w-4" /> As needed
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Hydration Tracker Widget */}
        <Card>
          <CardHeader>
            <CardTitle>Hydration Tracker</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 flex items-center justify-between">
              <span>Daily Goal: 3L</span>
              <span>Current: 2L</span>
            </div>
            <Progress value={66} className="h-3" />
            <div className="mt-4 flex justify-center">
              <Button>
                <Droplet className="mr-2 h-4 w-4" /> Log Water Intake
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Weather Alert Widget */}
        <Card>
          <CardHeader>
            <CardTitle>Weather Alert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold">72°F</p>
                <p className="text-sm text-gray-500">Partly Cloudy</p>
              </div>
              <Sun className="h-12 w-12 text-yellow-500" />
            </div>
            <div className="mt-4">
              <p className="text-sm font-semibold">Upcoming Weather Changes:</p>
              <p className="text-sm text-gray-600">
                Temperature drop expected in 2 days. Stay prepared!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Appointment Calendar Widget */}
        <Card>
          <CardHeader>
            <CardTitle>Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar />
            <div className="mt-4">
              <Button className="w-full">
                <Activity className="mr-2 h-4 w-4" /> Schedule Check-up
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Health Tips Widget */}
        <Card>
          <CardHeader>
            <CardTitle>Health Tips</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="nutrition">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
                <TabsTrigger value="exercise">Exercise</TabsTrigger>
                <TabsTrigger value="stress">Stress</TabsTrigger>
              </TabsList>
              <TabsContent value="nutrition">
                <p>
                  Ensure a balanced diet rich in fruits, vegetables, and whole
                  grains. Stay hydrated!
                </p>
              </TabsContent>
              <TabsContent value="exercise">
                <p>
                  Regular moderate exercise can help improve blood flow. Consult
                  your doctor for safe routines.
                </p>
              </TabsContent>
              <TabsContent value="stress">
                <p>
                  Practice relaxation techniques like deep breathing or
                  meditation to manage stress levels.
                </p>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
