import UserModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { tryCatch } from "../utils/tryCatch.js";

function generateToken(props) {
  return jwt.sign({ userId: props }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY })
}

export const signUp = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const duplicate = await UserModel.findOne({ email })
  if (duplicate) return res.status(409).json({ message: "Bad credentials"})
  const hashedPassword = await bcrypt.hash(password, 10)
  const newUser = new UserModel({ email, password: hashedPassword })
  await newUser.save()
  res.status(201).json({ message: "User created" })
});

export const login = tryCatch(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email })
  if (user) {
    const token = generateToken(user._id)
    const match = await bcrypt.compare(password, user.password)
    match
      ? res.status(200).json({ userId: user._id, token })
      : res.status(401).json({ message: 'Bad credentials' })
  } else res.status(401).json({ message: 'Bad credentials' })
});
