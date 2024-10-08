import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";

const tradingViewWebhook = async (symbol: string, side: string) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/tradingView/webhook`, {
      symbol,
      side,
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Create sell order request failed with error:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data || error.message);
    } else {
      console.error("An unexpected error occurred:", (error as Error).message);
      throw error;
    }
  }
};

export default function useTradingViewWebhook() {
  const mutation = useMutation({
    mutationFn: (order: { symbol: string; side: string }) =>
      tradingViewWebhook(order.symbol, order.side),
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
}
