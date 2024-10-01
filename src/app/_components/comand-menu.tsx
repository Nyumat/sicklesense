import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Calculator, Calendar, Check, ChevronsUpDown, CreditCard, Settings, Smile, User } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Command
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const appointments = [
    { value: "1", label: "Checkup with Dr. Smith" },
    { value: "2", label: "Blood Test" },
    { value: "3", label: "Blood Transfusion" },
]

// const medications = [
//     { value: "1", label: "Ibuprofen" },
//     { value: "2", label: "Folic Acid" },
//     { value: "3", label: "Hydroxyurea" },
//     { value: "4", label: "Vitamin D" },
// ]

export function CommandMenu() {
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [value, setValue] = React.useState("")
    const router = useRouter()
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
        }
        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    }, [])

    const handleNavigation = (path: string) => {
        router.push(path)
        setOpen(false)
    }

    return (
        <>
            <Popover open={open2} onOpenChange={setOpen2}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open2}
                        className="w-[200px] justify-between"
                    >
                        {value
                            ? appointments.find((appt) => appt.value === value)?.label
                            : (<>
                                <p className="text-xs text-muted-foreground">
                                    Select an Appointment
                                </p>
                            </>)}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                    <Command>
                        <CommandInput placeholder="Search Appointments..." />
                        <CommandList>
                            <CommandEmpty>No Appointment found.</CommandEmpty>
                            <CommandGroup>
                                {appointments.map((appt) => (
                                    <CommandItem
                                        key={appt.value}
                                        value={appt.value}
                                        onSelect={(currentValue) => {
                                            setValue(currentValue === value ? "" : currentValue)
                                            setOpen2(false)
                                        }}
                                    >
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                value === appt.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                        {appt.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or search..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Suggestions">
                        <CommandItem onClick={() => handleNavigation('/chat')}>
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Chat</span>
                        </CommandItem>
                        <CommandItem onClick={() => handleNavigation('/plan')}>
                            <Smile className="mr-2 h-4 w-4" />
                            <span>Plan</span>
                        </CommandItem>
                        <CommandItem onClick={() => handleNavigation('/devices/connect')}>
                            <Calculator className="mr-2 h-4 w-4" />
                            <span>Connect Devices</span>
                        </CommandItem>
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup heading="Settings">
                        <CommandItem onClick={() => handleNavigation('/devices/metrics')}>
                            <User className="mr-2 h-4 w-4" />
                            <span>Device Metrics</span>
                            <CommandShortcut>⌘P</CommandShortcut>
                        </CommandItem>
                        <CommandItem onClick={() => handleNavigation('/medication')}>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Medication</span>
                            <CommandShortcut>⌘B</CommandShortcut>
                        </CommandItem>
                        <CommandItem onClick={() => handleNavigation('/account')}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Account</span>
                            <CommandShortcut>⌘S</CommandShortcut>
                        </CommandItem>
                        <CommandItem onClick={() => handleNavigation('/community')}>
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Community</span>
                        </CommandItem>
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </>
    )
}
