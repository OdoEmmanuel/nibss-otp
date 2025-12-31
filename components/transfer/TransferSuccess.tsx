/* eslint-disable react-hooks/purity */
"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface TransferSuccessProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  recipientName: string | null;
  bank: string;
  accountNumber: string;
}

export function TransferSuccess({
  open,
  onClose,
  amount,
  recipientName,
  bank,
  accountNumber,
}: TransferSuccessProps) {
  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md text-center">
        <DialogHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 mb-4">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-center text-green-700">
            Transfer Successful!
          </DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <p className="text-muted-foreground mb-6">
            You have successfully transferred{" "}
            <span className="font-semibold text-foreground">
              ₦
              {amount.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
              })}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-foreground">
              {recipientName}
            </span>
            .
          </p>
          <div className="bg-muted/50 p-4 rounded-lg text-sm space-y-2 mb-6 text-left">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bank:</span>
              <span className="font-medium">{bank}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Account:</span>
              <span className="font-medium">{accountNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Transaction Ref:</span>
              <span className="font-medium font-mono">
                REF-{Math.floor(Math.random() * 1000000)}
              </span>
            </div>
          </div>
          <Button
            onClick={onClose}
            className="w-full bg-[#386b0b] hover:bg-[#386b0b]/90 h-12 text-base"
          >
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
