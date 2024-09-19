import {
  Bookmark,
  LayoutGrid,
  LucideIcon,
  MessageSquare,
  Settings,
  SquarePen,
  Tag,
  Users,
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
      groupLabel: "Contents",
      menus: [
        {
          href: "/community",
          label: "Community",
          active: pathname.includes("/community"),
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
          href: "/categories",
          label: "Categories",
          active: pathname.includes("/categories"),
          icon: Bookmark,
          submenus: [],
        },
        {
          href: "/tags",
          label: "Tags",
          active: pathname.includes("/tags"),
          icon: Tag,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/users",
          label: "Users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
}
