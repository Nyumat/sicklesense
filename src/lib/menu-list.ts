import {
  BotMessageSquare,
  ChartLine,
  Hospital,
  LayoutGrid,
  LucideIcon,
  MessageSquare,
  PillBottle,
  Settings,
  SquarePen,
  Users,
  Watch,
  Wifi,
} from "lucide-react";

export type Submenu = {
  href: string;
  label: string;
  active: boolean;
  icon?: LucideIcon;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Home",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Core",
      menus: [
        {
          href: "/community",
          label: "Community",
          active: pathname === "/community",
          icon: Users,
          submenus: [
            {
              href: "/community/posts",
              label: "Community Discussion",
              icon: MessageSquare,
              active: pathname === "/community/posts",
            },
            {
              href: "/community/posts/new",
              label: "New Post",
              icon: SquarePen,
              active: pathname === "/community/posts/new",
            },
          ],
        },
        {
          href: "/chat",
          label: "Chat",
          active: pathname.includes("/chat"),
          icon: BotMessageSquare,
          submenus: [],
        },
        {
          href: "/plan",
          label: "Health Plan",
          active: pathname.includes("/plan"),
          icon: Hospital,
          submenus: [],
        },
        {
          href: "/devices",
          label: "Wearable Devices",
          active: pathname === "/devices",
          icon: Watch,
          submenus: [
            {
              href: "/devices/metrics",
              label: "Device Metrics",
              icon: ChartLine,
              active: pathname === "/devices/metrics",
            },
            {
              href: "/devices/connect",
              label: "Connect a Device",
              icon: Wifi,
              active: pathname === "/devices/connect",
            },
          ],
        },
      ],
    },
    {
      groupLabel: "Profile",
      menus: [
        {
          href: "/medication",
          label: "Medication List",
          active: pathname.includes("/medication"),
          icon: PillBottle,
          submenus: [],
        },
        {
          href: "/account",
          label: "My Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
