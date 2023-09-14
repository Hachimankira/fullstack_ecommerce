"use client";
import { useState } from "react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../modal";

import * as z from "zod";
import axios from "axios";
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
import toast from "react-hot-toast";


const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be larger than 2 character."
    }),
});



export const StoreModal = () => {
    const storeModal = useStoreModal();

    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true);

            const response = await axios.post('/api/stores', values);
            console.log(response.data);
            toast.success("Store Created");
        } catch (error) {
            toast.error("Something went wrong!");
        } finally {
            setLoading(false);
        }
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
                                            <Input
                                                placeholder="Ecommerce"
                                                {...field}
                                                disabled={loading}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            {/* This is your public display name. */}
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="pt-6 space-x-2 flex items-center justify-end">
                                <Button variant={"outline"} onClick={storeModal.onClose} disabled={loading}>Cancel</Button>
                                <Button type="submit" disabled={loading}>Continue</Button>
                            </div>
                        </form>
                    </Form>
                </div>

            </div>
        </Modal>
    );

};