import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";

async function getAllTrades() {
  const response = await axios.get(`${BASE_URL}/trades/getAllTrades`);
  return response.data;
}

export default function useGetAllTrades() {
  return useQuery({
    queryKey: ["getAllTrades"],
    queryFn: getAllTrades,
    refetchInterval: 1000,
  });
}
