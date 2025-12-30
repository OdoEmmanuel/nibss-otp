import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowDownRight, ArrowUpRight, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Transaction {
  id: string;
  amount: number;
  type: "debit" | "credit";
  description: string;
  date: Date;
  status: "completed" | "pending";
  reference: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(amount);
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("en-NG", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

export function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="px-8 py-2">Type</TableHead>
            <TableHead className="px-8 py-2">Description</TableHead>
            <TableHead className="px-8 py-2">Amount</TableHead>
            <TableHead className="px-10 py-2">Date</TableHead>
            <TableHead className="px-8 py-2">Status</TableHead>
            <TableHead className="px-8 py-2">Reference</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "rounded-full p-2",
                        transaction.type === "credit"
                          ? "bg-green-100 "
                          : "bg-red-100 "
                      )}
                    >
                      {transaction.type === "credit" ? (
                        <ArrowDownRight className="size-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="size-4 text-red-600" />
                      )}
                    </div>
                    <span className="font-medium capitalize text-foreground">
                      {transaction.type}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <p className="font-medium text-foreground truncate max-w-50">
                    {transaction.description}
                  </p>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <span
                    className={cn(
                      "font-semibold",
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-600"
                    )}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="size-3" />
                    {formatDate(transaction.date)}
                  </div>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
                      transaction.status === "completed"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    )}
                  >
                    {transaction.status}
                  </span>
                </TableCell>
                <TableCell className="px-4 py-2">
                  <span className="font-mono text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded">
                    {transaction.reference}
                  </span>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
