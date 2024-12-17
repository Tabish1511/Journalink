import { Router } from "express";
import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt"; // For hashing passwords
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const userRouter = Router();
const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET must be defined in the environment variables");
}

const userSignupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

userRouter.post("/signup", async (req, res) => {
  try {
    const parsedBody = userSignupSchema.safeParse(req.body);

    if (!parsedBody.success) {
      const errors = parsedBody.error.issues.map((issue) => issue.message);
      res.status(400).json({ message: "Validation failed", errors });
      return;
    }

    const { email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already in use",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });

    const token = jwt.sign({ id: newUser.id }, JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: false
    });

    res.status(201).json({
      message: "Signup successful",
      token,
    });
  } catch (error: any) {
    console.error("Error during signup:", error.message);
    res.status(500).json({
      message: "An error occurred during signup",
      error: error.message,
    });
  }
});

export default userRouter;
