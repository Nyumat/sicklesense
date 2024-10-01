import React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, lowerCase } from "@/lib/utils";
import countries from "@/data/countries.json";
import { useDropdownStore } from "@/lib/store";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

interface CountryProps {
    id: number;
    name: string;
    iso3: string;
    iso2: string;
    numeric_code: string;
    phone_code: string;
    capital: string;
    currency: string;
    currency_name: string;
    currency_symbol: string;
    tld: string;
    native: string;
    region: string;
    region_id: string;
    subregion: string;
    subregion_id: string;
    nationality: string;
    timezones: Timezone[];
    translations: Record<string, string>;
    latitude: string;
    longitude: string;
    emoji: string;
    emojiU: string;
}

interface Timezone {
    zoneName: string;
    gmtOffset: number;
    gmtOffsetName: string;
    abbreviation: string;
    tzName: string;
}

interface CountryDropdownProps {
    disabled?: boolean;
}

export function CountryDropdown({ disabled }: CountryDropdownProps) {
    const { countryValue, setCountryValue, openCountryDropdown, setOpenCountryDropdown } =
        useDropdownStore();
    const C = (countries as CountryProps[]) || [];

    return (
        <Popover open={openCountryDropdown} onOpenChange={setOpenCountryDropdown}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={openCountryDropdown}
                    className="w-[300px] justify-between rounded-[6px] border !border-[#27272a] !bg-[#0f0f11] hover:!bg-[#0f0f11] focus:!bg-[#0f0f11] focus:!outline-none focus:!ring-2 focus:!ring-[#0f0f11] focus:!ring-offset-2 focus:!ring-offset-[#0f0f11]"
                    disabled={disabled}
                >
                    <span>
                        {countryValue ? (
                            <div className="flex items-end gap-2">
                                <span>
                                    {
                                        C.find(
                                            (country) => lowerCase(country.name) === countryValue
                                        )?.emoji
                                    }
                                </span>
                                <span>
                                    {
                                        C.find(
                                            (country) => lowerCase(country.name) === countryValue
                                        )?.name
                                    }
                                </span>
                            </div>
                        ) : (
                            <span>Select Country...</span>
                        )}
                    </span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] rounded-[6px] border border-[#27272a] p-0">
                <Command>
                    <CommandInput placeholder="Search country..." />
                    <CommandEmpty>No country found.</CommandEmpty>
                    <CommandGroup>
                        <ScrollArea className="h-[300px] w-full">
                            <CommandList>
                                {C.map((country) => (
                                    <CommandItem
                                        key={country.id}
                                        value={country.name}
                                        onSelect={(currentValue) => {
                                            setCountryValue(lowerCase(currentValue));
                                            setOpenCountryDropdown(false);
                                        }}
                                        className="flex cursor-pointer items-center justify-between text-xs hover:!bg-[#27272a] hover:!text-white"
                                    >
                                        <div className="flex items-end gap-2">
                                            <span>{country.emoji}</span>
                                            <span className="">{country.name}</span>
                                        </div>
                                        <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                countryValue === lowerCase(country.name)
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
