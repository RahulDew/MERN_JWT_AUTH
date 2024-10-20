import { Request, Response } from "express";
import User from "../models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = "your_jwt_secret";

export const register = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  try {
    const user = new User({ username, email, password });
    await user.save();
    console.log("User registered successfully");
    res.status(201).json({ message: "User registered successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(await user.comparePassword(password))) {
      console.log("Invalid credentials");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      JWT_SECRET,
      { expiresIn: "50h" }
    );
    res.cookie("token", token, {
      httpOnly: false,
      // secure: process.env.NODE_ENV === "production", // Set to true in production
      sameSite: "lax",
    });
    res.json({ message: "Login successful" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({ message: "Logout successful" });
};
