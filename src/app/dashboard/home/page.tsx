import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// const colors = [
//   "hsl(290, 70%, 60%)",
//   "hsl(290, 70%, 70%)",
//   "hsl(290, 70%, 80%)",
// ];
const topics = ["All", "Animals", "Places", "Things"];
const stories = [
  { title: "Frog on lilypad" },
  { title: "Duck duck goose" },
  { title: "Bread and butter" },
  { title: "Cows in the field" },
  { title: "Riding horses" },
  { title: "Bunnies in the barn" },
];

export default function CommunityHub() {
  return (
    <div className="p-8">
      <h1 className="mb-6 text-2xl font-bold">Community hub</h1>

      <div className="mb-6">
        <Input type="search" placeholder="Search" className="max-w-sm" />
      </div>

      <div className="mb-6">
        <h2 className="mb-2 text-xl font-semibold">Select a topic</h2>
        <div className="flex space-x-2">
          {topics.map((topic) => (
            <Button
              key={topic}
              variant={topic === "All" ? "default" : "outline"}
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        {stories.map((story) => (
          <Card key={story.title}>
            <CardContent
              className={`rounded-md bg-gradient-to-br from-[hsla(290,70%,60%,1)] to-[hsla(290,71%,80%,1)] p-4`}
            >
              <h3 className="text-center font-semibold">{story.title}</h3>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="ml-auto max-w-sm">
        <CardContent className="p-4">
          <h3 className="mb-2 font-semibold">Your story tokens</h3>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">562 tokens</span>
            <Button>Buy tokens</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 space-y-2">
        <Button variant="outline" className="w-full justify-start">
          <span className="mr-2">👋</span> Send kindness
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <span className="mr-2">🎁</span> Send a gift
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <span className="mr-2">💖</span> Donate care package
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <span className="mr-2">💌</span> Send a card
        </Button>
      </div>
    </div>
  );
}
