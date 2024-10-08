// import { useMutation } from "@tanstack/react-query";
// import axios from "axios";
// import { BASE_URL } from "../constants/baseUrl";

// const createBuyOrder = async (
//   symbol: string,
//   side: string,
//   type: string,
//   quantity: number
// ) => {
//   try {
//     const { data } = await axios.post(
//       `${BASE_URL}/binance/buy`,
//       { symbol, side, type, quantity }
//     );
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     return data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       console.error(
//         "Create buy order request failed with error:",
//         error.response?.data || error.message
//       );
//       throw new Error(error.response?.data || error.message);
//     } else {
//       console.error("An unexpected error occurred:", (error as Error).message);
//       throw error;
//     }
//   }
// };

// export default function useCreateBuyOrder() {
//     const mutation = useMutation({
//       mutationFn: (order: {
//         symbol: string;
//         quantity: number;
//         side: string;
//         type: string;
//       }) => createBuyOrder(order.symbol, order.side, order.type, order.quantity),
//     });

//     return {
//       mutate: mutation.mutate,
//       isLoading: mutation.isPending,
//       isError: mutation.isError,
//     };
//   }
