"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../modal";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be larger than 2 character."
    }),
});



export const StoreModal = () => {
    const storeModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
    }

    return (
        <Modal title="Create Store"
            description="Add a new store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ecommerce" {...field} />
                                        </FormControl>
                                        <FormDescription>
                                            {/* This is your public display name. */}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            
                        </form>
                    </Form>
                </div>
                <div className="pt-6 space-x-2 flex items-center justify-end">
                <Button variant={"outline"} onClick={storeModal.onClose}>Cancel</Button>
                <Button type="submit">Continue</Button>
                </div>
            </div>
        </Modal>
    )

}