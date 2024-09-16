import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";

export interface NavItem {
  title: string;
  href: string;
  disabled?: boolean;
}

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex justify-center">
      {items?.length ? (
        <nav className="mx-auto mr-28 flex items-center justify-center">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "text-md text-dark gtransition flex items-center justify-center rounded-lg px-3 py-1 font-mono hover:bg-white/20 hover:py-0.5 hover:last:gap-2 hover:last:after:content-['_↗'] dark:text-white",
                    item.disabled && "cursor-not-allowed opacity-80",
                    "flex-grow",
                  )}
                  {...(index === items.length - 1 ? { target: "_blank" } : {})}
                >
                  {item.title}
                </Link>
              ),
          )}
        </nav>
      ) : null}
    </div>
  );
}
