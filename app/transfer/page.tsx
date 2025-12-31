"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { TransferDetailsForm } from "@/components/transfer/TransferDetailsForm";
import { TransferOTP } from "@/components/transfer/TransferOTP";
import { TransferSuccess } from "@/components/transfer/TransferSuccess";
import { transferSchema, TransferFormValues } from "@/components/transfer/schema";

export default function TransferPage() {
    const router = useRouter();
    const [step, setStep] = useState<"details" | "otp" | "success">("details");
    const [recipientName, setRecipientName] = useState<string | null>(null);
    const [isLoadingName, setIsLoadingName] = useState(false);

    const form = useForm<TransferFormValues>({
        resolver: zodResolver(transferSchema),
        defaultValues: {
            accountNumber: "",
            amount: "",
        },
        mode: "onChange",
    });

    const onDetailsSubmit = (data: TransferFormValues) => {
        if (!recipientName) return;
        setStep("otp");
    };

    const handleOtpComplete = () => {
        setStep("success");
    };

    const handleClose = () => {
        router.push("/transactions");
    };

    return (
        <div className="flex flex-col min-h-screen max-w-2xl mx-auto p-6">
            <div className="mb-8 flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.back()}
                    className="rounded-full"
                >
                    <ChevronLeft className="w-6 h-6" />
                </Button>
                <h1 className="text-2xl font-bold text-foreground">Transfer Funds</h1>
            </div>

            <AnimatePresence mode="wait">
                {step === "details" && (
                    <Form {...form}>
                        <TransferDetailsForm
                            form={form}
                            recipientName={recipientName}
                            setRecipientName={setRecipientName}
                            isLoadingName={isLoadingName}
                            setIsLoadingName={setIsLoadingName}
                            onNext={onDetailsSubmit}
                        />
                    </Form>
                )}

                {step === "otp" && (
                    <TransferOTP
                        onBack={() => setStep("details")}
                        onComplete={handleOtpComplete}
                    />
                )}
            </AnimatePresence>

            <TransferSuccess
                open={step === "success"}
                onClose={handleClose}
                amount={Number(form.getValues("amount"))}
                recipientName={recipientName}
                bank={form.getValues("bank")}
                accountNumber={form.getValues("accountNumber")}
            />
        </div>
    );
}
