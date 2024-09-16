import { ModeToggle } from "@/components/theme-toggle";
import { MainNav } from "./site-header-mobile";

export async function SiteHeader() {
  return (
    <section className="mb-36">
      {/* <div className="block md:hidden">
        <HeaderMobile />
      </div> */}
      <div className="hidden md:block">
        <header className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-center overflow-hidden rounded-b-sm border-b border-white/20 bg-neutral-800/20 px-3 backdrop-blur-lg">
          <a
            href="/"
            className="false gtransition mr-2 flex items-center gap-2.5 truncate rounded-xl p-2.5 hover:bg-white/10 active:scale-90 active:bg-white/20 [&_img]:hover:ml-0 [&_img]:hover:scale-100 [&_img]:hover:opacity-100 [&_img]:hover:blur-none"
          >
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl font-semibold tracking-tight">
                SickleSense
              </h1>
            </div>
          </a>
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
