"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TransferOTPProps {
  onBack: () => void;
  onComplete: () => void;
}

export function TransferOTP({ onBack, onComplete }: TransferOTPProps) {
  const [otp, setOtp] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) return;

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onComplete();
    }, 5000);
  };

  return (
    <motion.div
      key="otp"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold mb-2">Enter OTP</h2>
        <p className="text-muted-foreground text-sm">
          Use the NIBSS Authenticator app to generate a one-time OTP to complete
          your transaction.  <span className="text-sm font-medium mt-2 text-[#386b0b]">
            Expires in {formatTime(timeLeft)}
          </span>
        </p>

      </div>

      <form
        onSubmit={handleOtpSubmit}
        className="space-y-8 bg-card p-8 rounded-xl border border-border shadow-sm"
      >
        <div className="flex justify-center">
          <Input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
            }
            className="w-48 text-center text-3xl tracking-widest h-16 font-mono"
            placeholder="------"
            autoFocus
          />
        </div>

        <Button
          type="submit"
          disabled={otp.length !== 6 || isProcessing || timeLeft === 0}
          className="w-full h-12 text-base font-semibold bg-[#386b0b] hover:bg-[#386b0b]/90 disabled:opacity-50 cursor-pointer"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              Processing...
            </div>
          ) : (
            "Send"
          )}
        </Button>
        <Button
          type="button"
          variant="ghost"
          className="w-full text-muted-foreground cursor-pointer"
          onClick={onBack}
          disabled={isProcessing}
        >
          Cancel Information
        </Button>
      </form>
    </motion.div>
  );
}
