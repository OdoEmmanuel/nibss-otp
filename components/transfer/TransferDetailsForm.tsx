"use client";

import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { BANKS, RANDOM_NAMES } from "./constants";
import { TransferFormValues } from "./schema";

interface TransferDetailsFormProps {
    form: UseFormReturn<TransferFormValues>;
    recipientName: string | null;
    setRecipientName: (name: string | null) => void;
    isLoadingName: boolean;
    setIsLoadingName: (loading: boolean) => void;
    onNext: (data: TransferFormValues) => void;
}

export function TransferDetailsForm({
    form,
    recipientName,
    setRecipientName,
    isLoadingName,
    setIsLoadingName,
    onNext,
}: TransferDetailsFormProps) {
    const { watch, formState } = form;
    const watchedAccountNumber = watch("accountNumber");
    const watchedBank = watch("bank");

    useEffect(() => {
        if (
            watchedAccountNumber?.length === 10 &&
            /^\d+$/.test(watchedAccountNumber) &&
            watchedBank
        ) {
            setIsLoadingName(true);
            const timer = setTimeout(() => {
                const randomName =
                    RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
                setRecipientName(randomName);
                setIsLoadingName(false);
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setRecipientName(null);
        }
    }, [watchedAccountNumber, watchedBank, setRecipientName, setIsLoadingName]);

    return (
        <motion.div
            key="details"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="w-full"
        >
            <form
                onSubmit={form.handleSubmit(onNext)}
                className="space-y-6 bg-card p-6 rounded-xl border border-border shadow-sm"
            >
                <FormField
                    control={form.control}
                    name="bank"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Bank</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger className="h-12">
                                        <SelectValue placeholder="Select a bank" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {BANKS.map((bank) => (
                                        <SelectItem key={bank} value={bank}>
                                            {bank}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="accountNumber"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="0123456789"
                                    className="h-12 tracking-wider"
                                    maxLength={10}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="h-8">
                    <AnimatePresence>
                        {isLoadingName && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Verifying details...
                            </motion.div>
                        )}
                        {!isLoadingName && recipientName && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-[#386b0b] font-medium flex items-center gap-2"
                            >
                                <CheckCircle2 className="w-4 h-4" />
                                {recipientName}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Amount (NGN)</FormLabel>
                            <FormControl>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        ₦
                                    </span>
                                    <Input
                                        placeholder="0.00"
                                        className="h-12 pl-8 text-lg font-medium"
                                        {...field}
                                    />
                                </div>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full h-12 text-base font-semibold bg-[#386b0b] hover:bg-[#386b0b]/90"
                    disabled={!formState.isValid || !recipientName || isLoadingName}
                >
                    Next
                </Button>
            </form>
        </motion.div>
    );
}
