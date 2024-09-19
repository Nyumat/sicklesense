import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";

export default async function Dashboard() {
  const session = await getServerAuthSession();

  return (
    <div className="p-8">
      <h1 className="mb-4 text-2xl font-bold">
        Welcome back, {session?.user.name}!
      </h1>
      <p className="mb-6 text-sm text-gray-500">
        You have 2 stories waiting for you!
      </p>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Story of the day</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center p-4">
          <Image
            width={200}
            height={200}
            src="https://placekitten.com/200/200"
            alt="Cat"
            className="mr-4 h-12 w-12"
          />
          <div className="flex-grow">
            <h3 className="font-semibold">Create a story!</h3>
            <p className="text-sm text-gray-500">
              Use our AI to create a unique story
            </p>
          </div>
          <Button>Make magic</Button>
        </CardContent>
      </Card>

      <h2 className="mb-4 text-xl font-semibold">Your Stats</h2>
      <div className="mb-6 grid grid-cols-3 gap-4">
        {["Cows in the field", "Riding horses", "Magical chicken"].map(
          (story) => (
            <Card key={story}>
              <CardContent className="p-4">
                <Image
                  width={200}
                  height={200}
                  src="https://placekitten.com/200/200"
                  alt="Cat"
                  className="mb-4 h-12 w-12"
                />
                <h3 className="font-semibold">{story}</h3>
                <p className="text-sm text-gray-500">animals - grazing</p>
              </CardContent>
            </Card>
          ),
        )}
      </div>

      <h2 className="mb-4 text-xl font-semibold">Emotional health</h2>
      <Card>
        <CardContent className="p-4">
          <div className="mb-4">
            <p className="mb-1 text-sm font-semibold">Satisfaction</p>
            <Progress value={80} className="h-2" />
          </div>
          <div className="mb-4">
            <p className="mb-1 text-sm font-semibold">Concentration</p>
            <Progress value={60} className="h-2" />
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold">Curiosity</p>
            <Progress value={90} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
