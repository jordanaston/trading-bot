import { Request, Response } from "express";
import User from "../../models/User";

export const createUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const newUser = new User({ email, password });

  try {
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
