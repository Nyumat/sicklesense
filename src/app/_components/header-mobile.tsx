"use client"

import { ModeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AnimatePresence, motion } from 'framer-motion'
import { Session } from "next-auth"
import Link from 'next/link'
import { useMemo, useState } from 'react'

const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '/contact' },
]

const loggedInNavItems = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Chat', href: '/dashboard/chat' },
    { name: 'Your Account', href: '/dashboard/account' },
    { name: 'Logout', href: '/logout' },
]

interface HeaderMobileProps {
    session: Session | null
}

export function HeaderMobile({ session }: HeaderMobileProps) {
    const [isOpen, setIsOpen] = useState(false)
    const toggleMenu = () => setIsOpen(!isOpen)
    const renderedNavItems = useMemo(() =>
        session?.user ? [...navItems, ...loggedInNavItems] : navItems
        , [session?.user])

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
                <div className="mr-4 flex">
                    <Link className="mr-6 flex items-center space-x-2" href="/">
                        <span className="font-bold">SickleSense</span>
                    </Link>
                </div>
                <ModeToggle />
                <div className="flex flex-1 items-center justify-end space-x-2">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
                                onClick={toggleMenu}
                            >
                                <svg
                                    strokeWidth="1.5"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                >
                                    <motion.path
                                        d="M3 5H21"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                                    />
                                    <motion.path
                                        d="M3 12H21"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                                    />
                                    <motion.path
                                        d="M3 19H21"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                                    />
                                </svg>
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="pr-0">
                            <SheetHeader>
                                <SheetTitle>SickleSense</SheetTitle>
                            </SheetHeader>
                            <nav className="flex flex-col space-y-4 mt-4">
                                <AnimatePresence>
                                    {renderedNavItems.map((item, index) => (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ delay: index * 0.1 }}
                                        >
                                            <Link
                                                href={item.href}
                                                className="flex items-center text-lg font-semibold"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    )
}