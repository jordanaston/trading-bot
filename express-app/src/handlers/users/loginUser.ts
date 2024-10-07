import { Request, Response } from "express";
import User from "../../models/User";

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error("User not found");
    }

    if (password !== user.password) {
      throw new Error("Invalid password");
    }

    if (password === user.password) {
      return res.status(200).json({ message: "Login successful" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default loginUser;
