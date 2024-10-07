import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";

async function getBotStatus() {
  const response = await axios.get(`${BASE_URL}/bot/getBotStatus`);
  return response.data;
}

export default function useGetBotStatus() {
  return useQuery({
    queryKey: ["getBotStatus"],
    queryFn: getBotStatus,
  });
}
