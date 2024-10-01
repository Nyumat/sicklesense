import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import states from "@/data/states.json";
import { useDropdownStore } from "@/lib/store";
import { cn, lowerCase, sentenceCase } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

interface StateProps {
    id: number;
    name: string;
    country_id: number;
    country_code: string;
    country_name: string;
    state_code: string;
    type: string | null;
    latitude: string;
    longitude: string;
}

export function StateDropdown() {
    const { countryValue, stateValue, openStateDropdown, setOpenStateDropdown, setStateValue } =
        useDropdownStore();

    const SD = (states as StateProps[]) || [];
    const S = SD.filter((state) => sentenceCase(state.country_name) === sentenceCase(countryValue));

    return (
        <Popover open={openStateDropdown} onOpenChange={setOpenStateDropdown}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openStateDropdown}
                    className="w-[300px] justify-between rounded-[6px] border border-input bg-background hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={!countryValue || S.length === 0}
                >
                    {stateValue ? (
                        <div className="flex items-end gap-2">
                            <span>
                                {S.find((state) => lowerCase(state.name) === stateValue)?.name}
                            </span>
                        </div>
                    ) : (
                        <>
                            <span>
                                {!countryValue || S.length === 0 ? "Select a Country First" : "Select a State"}
                            </span>
                        </>
                    )}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] rounded-[6px] border border-border p-0">
                <Command className="bg-popover">
                    <CommandInput placeholder="Search state..." className="border-border" />
                    <CommandEmpty>No state found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-[300px] w-full">
                            <CommandList>
                                {S.map((state) => (
                                    <CommandItem
                                        key={state.id}
                                        value={state.name}
                                        onSelect={(currentValue) => {
                                            setStateValue(lowerCase(currentValue));
                                            setOpenStateDropdown(false);
                                        }}
                                        className="flex cursor-pointer items-center justify-between text-xs hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <div className="flex items-end gap-2">
                                            <span>{state.name}</span>
                                        </div>
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                stateValue === lowerCase(state.name)
                                                    ? "opacity-100"
                                                    : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandList>
                            <ScrollBar orientation="vertical" />
                        </ScrollArea>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};