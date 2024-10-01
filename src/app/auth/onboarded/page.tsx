"use client";
import { MultiStepLoader as Loader } from "@/components/magicui/multi-step-loader";
import { IconSquareRoundedX } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const loadingStates = [
    {
        text: "Personalizing SickleSense for you...",
    },
    {
        text: "Loading modules...",
    },
    {
        text: "Redirecting to your dashboard...",
    },
];

export default function MultiStepLoaderDemo() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
            router.push("/dashboard");
        }, 6000);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                        Loading...
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
