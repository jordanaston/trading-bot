import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";

const loginUser = async (username: string, password: string) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/users/loginUser`, {
      username,
      password,
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw Error("Login failed.");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export default loginUser;
