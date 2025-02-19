import { UserModel } from "../models/user.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { storeToken, revokeToken } from "./token.service";

dotenv.config();

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET || "default_secret";
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || "3600";

export const signup = async (email: string, password: string) => {
  const existingUser = await UserModel.findOne({ email });
  if (existingUser) throw new Error("Email already in use");

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = new UserModel({ email, password: hashedPassword });
  await user.save();
  
  return { message: "User registered successfully" };
};

export const login = async (email: string, password: string) => {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  const token = jwt.sign({ userId: user._id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  
  await storeToken(token, user._id.toString()); 

  return { accessToken: token };
};

export const logout = async (token: string) => {
  await revokeToken(token); 
  return { message: "Logged out successfully" };
};
