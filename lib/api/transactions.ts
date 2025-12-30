import axios from "axios";

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://dev.lyvac.net";

export interface TransactionLog {
  narration: string;
  amount: number;
  createdAt: string;
}

export interface TransactionsApiResponse {
  status: boolean;
  message: string;
  data: TransactionLog[];
}

export async function getTransactions(): Promise<TransactionsApiResponse> {
  try {
    const response = await axios.get<TransactionsApiResponse>(
      `/api/mandate/micro-debit/logs`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}
