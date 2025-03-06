import { z } from "zod";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
  res.json({ message: "Login route" });
};

export { registerController, loginController };
