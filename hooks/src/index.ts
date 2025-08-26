import express from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import { MongoExpiredSessionError } from "mongodb";

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
  const userId = req.params.userId;
  const zapId = req.params.zapId;
  const body = req.body;

  //store in a db a new trigger
  //Transactional Outbox Pattern!!

  const newZap = await prisma.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata: body,
      },
    });

    const runOutbox = await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });

  //push this in a queue  like kafka /redis
});

app.listen(3000, () => {
  console.log("WebHook Server is running!");
});
