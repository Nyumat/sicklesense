import Link from "next/link";

export function Footer() {
  return (
    <div className="z-20 w-full bg-background shadow backdrop-blur border-t-[1px]">
      <div className="mx-4 flex h-14 items-center md:mx-8">
        <p className="text-left text-xs leading-loose text-muted-foreground md:text-sm">
          SickleSense was made for the{" "}
          <Link
            href="https://afrotech.devpost.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            AfroTech AI Hackathon
          </Link>
          . The source code is available on{" "}
          <Link
            href="https://github.com/Nyumat/sicklesense"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
