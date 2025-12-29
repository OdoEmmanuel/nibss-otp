import { TransactionsLayout } from "@/components/transactions/TransactionsLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions | Nibbs NG",
  description: "View your transactions",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <TransactionsLayout>{children}</TransactionsLayout>;
}
