"use client"

import * as React from "react"
import { store } from "@prisma/client";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
// import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, PlusCircle, Store } from "lucide-react";

import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
  } from "@/components/ui/command"


type PopoverTriggerProps = React.ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
    items: store[];
}

export default function StoreSwitcher({
    className,
    items = []
}: StoreSwitcherProps) {
    const storeModal = useStoreModal();
    const params = useParams();
    const router = useRouter();

    const formattedItems = items.map((item) => ({
        label: item.name,
        value: item.id,
    }));

    const currentStore = formattedItems.find((item) => item.value === params.storeId);
    const [open, setOpen] = React.useState(false)

    const onStoreSelect = (store: { value: string, label: string }) => {
        setOpen(false);
        router.push(`/$(store.value)`);
    }


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <Store className="mr-2 h-4 w-4" />
                    {currentStore?.label}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <Command>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) =>(
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => onStoreSelect(store)}
                                    className="text-sm"
                                >
                                    <Store className="mr-2 h-4 w-4" />
                                    {store.label}
                                    <Check 
                                        className={cn("ml-auto h-4 w-4",
                                        currentStore?.value === store.value ? "opacity-100" : "opacity-0")}
                                    />

                                </CommandItem>
                            ))}                                                
                        </CommandGroup>                      
                    </CommandList>
                    <CommandSeparator />
                        <CommandList>
                            <CommandGroup>
                                <CommandItem
                                    onSelect={() => {
                                        setOpen(false)
                                        storeModal.onOpen()
                                    }}
                                >
                                    <PlusCircle className="mr-2 h-5 h-5" />
                                    Create Store
                                </CommandItem>
                            </CommandGroup>
                        </CommandList>
                </Command>

            </PopoverContent>
        </Popover>

    );
};