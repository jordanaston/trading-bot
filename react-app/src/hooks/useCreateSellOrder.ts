import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";

const createSellOrder = async (symbol: string) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/binance/sell`, {
      symbol,
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

export default function useCreateSellOrder() {
  const mutation = useMutation({
    mutationFn: (order: { symbol: string }) => createSellOrder(order.symbol),
  });

  return {
    mutate: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
  };
}
