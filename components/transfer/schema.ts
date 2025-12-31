import * as z from "zod";

export const transferSchema = z.object({
    bank: z.string({ message: "Please select a bank" }),
    accountNumber: z
        .string()
        .length(10, "Account number must be exactly 10 digits")
        .regex(/^\d+$/, "Account number must be digits only"),
    amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
        message: "Amount must be greater than 0",
    }),
});

export type TransferFormValues = z.infer<typeof transferSchema>;
