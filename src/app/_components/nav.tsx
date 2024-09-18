import { ModeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { MainNav } from "./site-header-mobile";

export async function SiteHeader() {
  return (
    <section>
      {/* <div className="block md:hidden">
        <HeaderMobile />
      </div> */}
      <div className="hidden md:block">
        <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-center overflow-hidden rounded-b-sm border-b border-white/20 bg-neutral-800/20 px-3 backdrop-blur-lg">
          <Link href="/" className="">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-semibold tracking-tight">
                SickleSense
              </h1>
            </div>
          </Link>
          <div className="flex h-full w-full max-w-6xl items-center justify-center gap-2.5">
            <div className="mx-auto flex h-full flex-grow items-center justify-center">
              <MainNav
                items={[
                  {
                    title: "Home",
                    href: "/",
                  },
                  {
                    title: "About",
                    href: "/about",
                  },
                  {
                    title: "Contact",

                    href: "/contact",
                  },
                ]}
              />
            </div>
            <div>
              <nav>
                <ModeToggle />
              </nav>
            </div>
          </div>
        </header>
      </div>
    </section>
  );
}
