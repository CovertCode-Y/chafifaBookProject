import { Request, Response } from "express";
import { signup, login, logout } from "../services/auth.service";

export const signupHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await signup(email, password);
    res.status(201).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const result = await login(email, password);
    res.status(200).json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred" });
    }
  }
};

export const logoutHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(400).json({ message: "No token provided" });
      return;
    }

    const result = await logout(token);
    res.status(200).json(result);
  } catch (error: unknown) {
    res.status(500).json({ message: "Failed to log out" });
  }
};
