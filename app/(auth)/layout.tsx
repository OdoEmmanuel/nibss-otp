import { AuthLayout } from "@/components/auth/AuthLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Nibbs NG",
    default: "Nibbs NG",
  },
  description: "Sign in or create an account to using Nibbs NG.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
