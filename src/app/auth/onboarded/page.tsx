"use client";
import { MultiStepLoader as Loader } from "@/components/magicui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useEffect, useState } from "react";

const loadingStates = [
  {
    text: "Buying a condo",
  },
  {
    text: "Travelling in a flight",
  },
  {
    text: "Meeting Tyler Durden",
  },
  {
    text: "He makes soap",
  },
  {
    text: "We goto a bar",
  },
  {
    text: "Start a fight",
  },
  {
    text: "We like it",
  },
  {
    text: "Welcome to F**** C***",
  },
];

export default function MultiStepLoaderDemo() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <div className="grid grid-cols-2 items-center justify-center gap-64">
        <Loader
          loadingStates={loadingStates}
          loading={loading}
          duration={2000}
        />
        {loading && (
          <h1 className="z-[950] text-3xl text-white">
            Personalizing SickleSense for you...
          </h1>
        )}
      </div>
      {loading && (
        <button
          className="fixed right-4 top-4 z-[120] text-black dark:text-white"
          onClick={() => setLoading(false)}
        >
          <IconSquareRoundedX className="h-10 w-10" />
        </button>
      )}
    </div>
  );
}
