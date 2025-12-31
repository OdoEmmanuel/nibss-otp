"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Search,
  Download,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TransactionTable, Transaction } from "./TransactionTable";
import { TransactionPagination } from "./TransactionPagination";
import { getTransactions, TransactionLog } from "@/lib/api/transactions";

const ITEMS_PER_PAGE = 10;

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

function transformTransactionLog(
  log: TransactionLog,
  index: number
): Transaction {
  return {
    id: `${index + 1}`,
    amount: log.amount,
    type: "debit" as const,
    description: log.narration,
    date: new Date(log.createdAt),
    status: "completed" as const,
    reference: log.narration.split("-").pop() || `REF-${index + 1}`,
  };
}

export function TransactionsList() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTransactions = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getTransactions();

      if (response.status && response.data) {
        const transformedTransactions = response.data.map(
          transformTransactionLog
        );
        setTransactions(transformedTransactions);
      }
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
      setError("Failed to load transactions. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const filteredTransactions = useMemo(() => {
    if (!searchQuery) return transactions;

    const query = searchQuery.toLowerCase();
    return transactions.filter(
      (t) =>
        t.description.toLowerCase().includes(query) ||
        t.reference.toLowerCase().includes(query)
    );
  }, [searchQuery, transactions]);

  const paginationData = useMemo(() => {
    const totalItems = filteredTransactions.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentTransactions = filteredTransactions.slice(
      startIndex,
      endIndex
    );

    return {
      totalItems,
      totalPages,
      startIndex,
      endIndex,
      currentTransactions,
    };
  }, [filteredTransactions, currentPage]);

  const stats = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "credit")
      .reduce((acc, curr) => acc + curr.amount, 0);
    const expenses = transactions
      .filter((t) => t.type === "debit")
      .reduce((acc, curr) => acc + curr.amount, 0);
    return {
      income,
      expenses,
      balance: income - expenses,
    };
  }, [transactions]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    },
    []
  );

  const handleRetry = useCallback(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="size-8 animate-spin text-[#386b0b]" />
          <p className="text-muted-foreground">Loading transactions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-100">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6 max-w-md">
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Error Loading Transactions
          </h3>
          <p className="text-sm text-red-600">{error}</p>
          <Button
            onClick={handleRetry}
            className="mt-4 bg-[#386b0b] hover:bg-[#386b0b]/80"
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Transactions
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your transactions?
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push("/transfer")}
            variant="default"
            size="sm"
            className="gap-2 bg-[#386b0b] hover:bg-[#386b0b]/80 text-white py-5 w-40 cursor-pointer"
          >
            Transfer
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
          <TransactionTable transactions={paginationData.currentTransactions} />
        </div>

        {paginationData.totalItems > 0 && (
          <TransactionPagination
            currentPage={currentPage}
            totalPages={paginationData.totalPages}
            onPageChange={handlePageChange}
            totalItems={paginationData.totalItems}
            startIndex={paginationData.startIndex}
            endIndex={paginationData.endIndex}
          />
        )}
      </div>
    </div>
  );
}
