import { AuthLayout } from "@/components/auth/AuthLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | United Bank of Nigeria",
    default: "United Bank of Nigeria",
  },
  description: "Sign in or create an account to using United Bank of Nigeria.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <AuthLayout>{children}</AuthLayout>;
}
