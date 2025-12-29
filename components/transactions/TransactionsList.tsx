"use client";

import { useState, useMemo } from "react";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionTable, Transaction } from "./TransactionTable";
import { TransactionPagination } from "./TransactionPagination";

// dummy data
const mockTransactions: Transaction[] = [
  {
    id: "1",
    amount: 1500000,
    type: "credit",
    description: "Salary payment - January 2024",
    date: new Date("2024-12-20T09:15:00"),
    status: "completed",
    reference: "TXN-2024-001234",
  },
  {
    id: "2",
    amount: 500000,
    type: "debit",
    description: "Bank transfer to Jane Smith",
    date: new Date("2024-12-19T14:32:00"),
    status: "completed",
    reference: "TXN-2024-001233",
  },
  {
    id: "3",
    amount: 250000,
    type: "credit",
    description: "Payment received from ABC Company",
    date: new Date("2024-12-18T11:45:00"),
    status: "completed",
    reference: "TXN-2024-001232",
  },
  {
    id: "4",
    amount: 75000,
    type: "debit",
    description: "Utility bill payment - December",
    date: new Date("2024-12-17T16:20:00"),
    status: "pending",
    reference: "TXN-2024-001231",
  },
  {
    id: "5",
    amount: 1200000,
    type: "credit",
    description: "Refund from merchant - Order #12345",
    date: new Date("2024-12-16T10:30:00"),
    status: "completed",
    reference: "TXN-2024-001230",
  },
  {
    id: "6",
    amount: 35000,
    type: "debit",
    description: "ATM withdrawal - Branch XYZ",
    date: new Date("2024-12-15T08:15:00"),
    status: "completed",
    reference: "TXN-2024-001229",
  },
  {
    id: "7",
    amount: 2000000,
    type: "credit",
    description: "Investment return payment",
    date: new Date("2024-12-14T13:50:00"),
    status: "completed",
    reference: "TXN-2024-001228",
  },
  {
    id: "8",
    amount: 150000,
    type: "debit",
    description: "Subscription renewal - Premium Plan",
    date: new Date("2024-12-13T12:00:00"),
    status: "completed",
    reference: "TXN-2024-001227",
  },
  {
    id: "9",
    amount: 850000,
    type: "credit",
    description: "Freelance payment - Project Alpha",
    date: new Date("2024-12-12T15:25:00"),
    status: "pending",
    reference: "TXN-2024-001226",
  },
  {
    id: "10",
    amount: 45000,
    type: "debit",
    description: "Mobile airtime purchase",
    date: new Date("2024-12-11T07:40:00"),
    status: "completed",
    reference: "TXN-2024-001225",
  },
  {
    id: "11",
    amount: 320000,
    type: "debit",
    description: "Online purchase - E-commerce Store",
    date: new Date("2024-12-10T18:55:00"),
    status: "completed",
    reference: "TXN-2024-001224",
  },
  {
    id: "12",
    amount: 1800000,
    type: "credit",
    description: "Loan disbursement",
    date: new Date("2024-12-09T09:30:00"),
    status: "completed",
    reference: "TXN-2024-001223",
  },
];

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

export function TransactionsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // search filter
  const filteredTransactions = useMemo(() => {
    return mockTransactions.filter((t) => {
      return (
        t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.reference.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  // Pagination logic
  const totalItems = filteredTransactions.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex);

  // calculate stats from ALL transactions (not filtered) all from the dummy data just for ui
  const stats = useMemo(() => {
    const income = mockTransactions
      .filter((t) => t.type === "credit")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = mockTransactions
      .filter((t) => t.type === "debit")
      .reduce((acc, curr) => acc + curr.amount, 0);
    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Transactions
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your transactions
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="default"
            size="sm"
            className="gap-2 bg-[#386b0b] hover:bg-[#386b0b]/80 text-white py-5 w-40 cursor-pointer"
          >
            <Download className="size-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Wallet className="size-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Balance
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {formatCurrency(stats.balance)}
              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-500/10 p-3">
              <TrendingUp className="size-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Income
              </p>
              <h3 className="text-2xl font-bold text-green-600">
                {formatCurrency(stats.income)}
              </h3>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-red-500/10 p-3">
              <TrendingDown className="size-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Expenses
              </p>
              <h3 className="text-2xl font-bold text-red-600">
                {formatCurrency(stats.expenses)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-4 text-sm outline-none focus:border-[#386b0b] focus:ring-1 focus:ring-[#386b0b]"
        />
      </div>

      <div className="space-y-4">
        <div className="rounded-md border shadow-sm overflow-hidden">
          <TransactionTable transactions={currentTransactions} />
        </div>

        {totalItems > 0 && (
          <TransactionPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}
      </div>
    </div>
  );
}
