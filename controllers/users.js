import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/users.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email }); // db se  user find kar rhe

    if (!existingUser) {
      console.log("User doesn't exist.");
      return res.status(404).json({ message: "User doesn't exist." });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect) {
      console.log("Invalid Credentials.");
      return res.status(400).json({ message: "Invalid Credentials." });
    }

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    console.log("something when wrong in signin catch");
    res.status(500).json({ message: "something when wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email }); // db se  user find kar rhe

    if (existingUser) {
      console.log("User already exist.");
      return res.status(400).json({ message: "User already exist." });
    }
    if (password !== confirmPassword) {
      console.log("Confirm password don't match");
      return res.status(400).json({ message: "User already exist." });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    console.log("something when wrong in signup catch");
    res.status(500).json({ message: "something when wrong" });
  }
};
