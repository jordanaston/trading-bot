import { Request, Response } from "express";
import User from "../../models/User";
import bcrypt from "bcrypt";

export const createUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();
    res.status(201).json(newUser);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(409).json({ message: error.message });
    } else {
      res.status(409).json({ message: "An unknown error occurred" });
    }
  }
};
export default createUser;
