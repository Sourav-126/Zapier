import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export const triggerRouter = Router();

//"api/v1/trigger/available

triggerRouter.get("/available", async (req, res) => {
  const availableTrigger = await client.availableTriggers.findMany({});
  res.json({
    availableTrigger,
  });
});
