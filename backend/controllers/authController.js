import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const existingEmail = await User.findOne({ email });
    if (existingEmail)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
    });

    if (!newUser)
      return res.status(400).json({ message: "Failed to create user" });

    res
      .status(201)
      .json({ message: "User created successfully", success: true });
  } catch (err) {
    console.error("Signup failed", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signin = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user;
    if (username) {
      user = await User.findOne({ username });
    } else if (email) {
      user = await User.findOne({ email });
    }

    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const user_data = {
      name: user.name,
      username: user.username,
      email: user.email,
    };

    res.json({ message: "Login successful", token, user: user_data });
  } catch (err) {
    console.error("Signin failed", err);
    res.status(500).json({ message: "Something went wrong", err });
  }
};
