import { Router } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
const client = new PrismaClient();

export const actionRouter = Router();

actionRouter.get("/available", async (req, res) => {
  const availableActions = await client.availableActions.findMany({});
  return res.json({
    availableActions,
  });
});
