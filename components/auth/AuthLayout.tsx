"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background w-full grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block relative overflow-hidden">
        <Image
          src="/payment2.jpg"
          alt="People showing gratitude"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-8 left-8"
        >
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/altlogo.png"
              alt="United Bank of Nigeria Logo"
              width={100}
              height={100}
            />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="absolute bottom-12 left-8 right-8"
        >
          <h2 className="text-3xl font-bold text-white mb-2">
            Built for today ready for tomorrow
          </h2>
          <p className="text-white/80">
            We empower the banking ecosystem to improve the Nigeria payment
            industry
          </p>
          <div className="flex gap-2 mt-6">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 32 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="h-2 rounded-full bg-white"
            />
            <div className="w-2 h-2 rounded-full bg-white/50" />
            <div className="w-2 h-2 rounded-full bg-white/50" />
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col min-h-screen">
        <div className="lg:hidden p-6">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/altlogo.png" alt="United Bank of Nigeria Logo" width={60} height={60} />
          </Link>
        </div>
        <div className="flex-1 flex items-center justify-center px-6 lg:px-16 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
