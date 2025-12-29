import { TransactionsList } from "@/components/transactions/TransactionsList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Transactions",
  description: "View your transactions",
};

export default function TransactionsPage() {
  return <TransactionsList />;
}
