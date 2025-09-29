import { Router } from "express";

import { zapSchema } from "../types/types";
import { client } from "../db";
import { authMiddleware } from "../middlewares";
export const zapRouter = Router();
zapRouter.post("/", authMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.id;
  const body = req.body;
  const parsedData = zapSchema.safeParse(body);

  if (!parsedData.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const zapId = await client.$transaction(async (tx) => {
    const zap = await tx.zap.create({
      data: {
        userId: parseInt(id),
        triggerId: "",
        actions: {
          create: parsedData.data.actions.map((x, index) => ({
            actionId: x.availableActionId,
            sortingOrder: index,
            metadata: x.actionMetadata,
          })),
        },
      },
    });

    const trigger = await tx.trigger.create({
      data: {
        triggerId: parsedData.data.availableTriggerId,
        zapId: zap.id,
      },
    });

    await tx.zap.update({
      where: {
        id: zap.id,
      },
      data: {
        triggerId: trigger.id,
      },
    });

    return zap.id;
  });
  return res.json({
    zapId,
  });
});

zapRouter.get("/", authMiddleware, async (req, res) => {
  //@ts-ignore

  const id = req.id!;
  const zaps = await client.zap.findMany({
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    zaps,
  });
});

zapRouter.get("/:zapId", authMiddleware, async (req, res) => {
  //@ts-ignore

  const id = req.id!;
  const zapId = req.params.zapId;

  const zap = await client.zap.findFirst({
    where: {
      id: zapId,
      userId: id,
    },
    include: {
      actions: {
        include: {
          type: true,
        },
      },
      trigger: {
        include: {
          type: true,
        },
      },
    },
  });

  return res.json({
    zap,
  });
});

zapRouter.delete("/:zapId", async (req, res) => {
  const id = req.params.zapId;

  try {
    const isZapExists = await client.zap.findFirst({
      where: {
        id,
      },
    });

    if (!isZapExists) {
      return res.status(404).json({ message: "Zap doesn't exist" });
    }
    await client.trigger.deleteMany({
      where: { id },
    });

    await client.zap.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Zap deleted successfully" });
  } catch (err) {
    console.log("Error deleting zap :", err);
  }
});
