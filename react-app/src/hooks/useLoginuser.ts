import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";
import { useMutation } from "@tanstack/react-query";

const loginUser = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/loginUser`, {
      username,
      password,
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Login request failed with error:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data || error.message);
    } else {
      console.error("An unexpected error occurred:", (error as Error).message);
      throw error;
    }
  }
};

export default function useLoginUser() {
  const mutation = useMutation({
    mutationFn: (user: { username: string; password: string }) =>
      loginUser(user.username, user.password),
  });

  return {
    loginUser: mutation.mutate,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
