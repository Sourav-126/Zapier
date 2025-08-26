import { Router } from "express";
import { SigninData, SignupData } from "../types/types";
import { client } from "../db/db";
import jwt from "jsonwebtoken";
import { Request } from "express";
import authMiddleware from "../middlewares";

export const userRouter = Router();

interface ExtendedReq extends Request {
  id?: number;
}

userRouter.post("/signup", async (req, res) => {
  const parsedData = SignupData.safeParse(req.body);
  if (!parsedData.success) {
    console.log();
    res.status(411).json({
      message: "Dhang se bhar le na bhai ",
    });
  }
  const userExists = await client.user.findFirst({
    where: {
      email: parsedData.data?.email,
    },
  });

  if (userExists) {
    res.json({
      message: "User Already Exists",
    });
  }

  const newuUser = await client.user.create({
    data: {
      name: parsedData.data?.name || "Anonymous",
      email: parsedData.data?.email!,
      password: parsedData.data?.password!,
    },
  });

  const token = jwt.sign({ id: newuUser.id }, process.env.JWT_PASSWORD!);

  res.json({
    token,
  });
});

userRouter.post("/signin", async (req, res) => {
  const body = req.body;

  const parsedData = SigninData.safeParse(body);

  if (!parsedData.success) {
    res.status(411).json({
      message: "Dhang se bhar de laadle",
    });
  }

  const user = await client.user.findFirst({
    where: {
      email: parsedData.data?.email,
    },
  });

  if (!user) {
    res.send(" Sorry , Wrong Credentials");
  }

  const token = jwt.sign({ id: user?.id }, process.env.JWT_PASSWORD!);

  res.json(token);
});

userRouter.get("/", authMiddleware, async (req: ExtendedReq, res) => {
  const id = req.id;
  const user = await client.user.findFirst({
    where: {
      id,
    },
    select: {
      name: true,
      email: true,
    },
  });

  return res.json({ user });
});
