import { z } from "zod";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";

// Define a schema using Zod
const registerSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const registerController = async (req, res) => {
  try {
    const { username, email, password } = registerSchema.parse(req.body);

    // if user exists

    const userExists = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);

    const userExists = await User.findOne({
      email,
    });

    // if user does not exist

    if (!userExists) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // check password

    const isPasswordValid = await bcrypt.compare(password, userExists.password);

    // if password is invalid

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // token

    const token = jwt.sign({ id: userExists._id }, process.env.JWT_SECRET, {expiresIn: "24h"});

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });
    

    res.status(200).json({
      success: true,
      message: "User logged in successfully!",
      token,
      username: userExists.username,
      email: userExists.email,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export { registerController, loginController };
