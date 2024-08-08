import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const createUser = async (email: string, password: string) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5001/users",
      { email, password }
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Create user request failed with error:",
        error.response?.data || error.message
      );
      throw new Error(error.response?.data || error.message);
    } else {
      console.error("An unexpected error occurred:", (error as Error).message);
      throw error;
    }
  }
};

export default function useCreateUser() {
  return useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      createUser(user.email, user.password),
  });
}
