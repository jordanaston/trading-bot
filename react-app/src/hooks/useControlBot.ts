import axios from "axios";
import { BASE_URL } from "../constants/baseUrl";

const controlBot = async (control: string) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/bot/controlBot`, {
      control,
    });
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw Error("Control bot failed.");
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export default controlBot;
