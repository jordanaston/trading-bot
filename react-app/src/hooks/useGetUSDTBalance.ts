import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";

async function getUSDTBalance() {
  const response = await axios.get(`${BASE_URL}/binance/getUSDTBalance`);
  return response.data;
}

export default function useGetUSDTBalance() {
  return useQuery({
    queryKey: ["getUSDTBalance"],
    queryFn: () => getUSDTBalance(),
    refetchInterval: 1000,
  });
}
