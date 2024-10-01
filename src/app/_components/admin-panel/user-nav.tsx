"use client";

import { LayoutGrid, LogOut, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense } from "react";

export function UserNav() {
    const router = useRouter();
    const { data } = useSession();
    const me = data?.user;
    return (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <>
                                    <Suspense
                                        fallback={
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="" alt="" />
                                            </Avatar>
                                        }>
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={me?.image ?? ""} alt={me?.name ?? ""} />

                                        </Avatar>
                                    </Suspense>
                                </>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Profile</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{me?.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {me?.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="/dashboard" className="flex items-center" prefetch>
                            <LayoutGrid className="mr-3 h-4 w-4 text-muted-foreground" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="hover:cursor-pointer" asChild>
                        <Link href="/account" className="flex items-center" prefetch>
                            <User className="mr-3 h-4 w-4 text-muted-foreground" onClick={() => router.push("/account")} />
                            Account
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="hover:cursor-pointer" onClick={() => signOut({
                    redirect: true,
                    callbackUrl: "/",
                })}>
                    <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
                    Sign out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    );
}
