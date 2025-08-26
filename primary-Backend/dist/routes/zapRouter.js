"use strict";
// import { Router } from "express";
// import { zapSchema } from "../types/types";
// import { client } from "../db/db";
// export const zapRouter = Router();
// //@ts-ignore
// router.post("/", authMiddleware, async (req, res) => {
//   // @ts-ignore
//   const id: string = req.id;
//   const body = req.body;
//   const parsedData = zapSchema.safeParse(body);
//   if (!parsedData.success) {
//     return res.status(411).json({
//       message: "Incorrect inputs",
//     });
//   }
//   const zapId = await client.$transaction(async (tx) => {
//     const zap = await tx.zap.create({
//       data: {
//         userId: parseInt(id),
//         triggerId: "",
//         actions: {
//           create: parsedData.data.actions.map((x, index) => ({
//             actionId: x.availableActionId,
//             sortingOrder: index,
//             metadata: x.actionMetadata,
//           })),
//         },
//       },
//     });
//     const trigger = await tx.trigger.create({
//       data: {
//         triggerId: parsedData.data.availableTriggerId,
//         zapId: zap.id,
//       },
//     });
//     await tx.zap.update({
//       where: {
//         id: zap.id,
//       },
//       data: {
//         triggerId: trigger.id,
//       },
//     });
//     return zap.id;
//   });
//   return res.json({
//     zapId,
//   });
// });
// //@ts-ignore
// router.get("/", authMiddleware, async (req, res) => {
//   // @ts-ignore
//   const id = req.id;
//   const zaps = await client.zap.findMany({
//     include: {
//       actions: {
//         include: {
//           type: true,
//         },
//       },
//       trigger: {
//         include: {
//           type: true,
//         },
//       },
//     },
//   });
//   return res.json({
//     zaps,
//   });
// });
// //@ts-ignore
// router.get("/:zapId", authMiddleware, async (req, res) => {
//   //@ts-ignore
//   const id = req.id;
//   const zapId = req.params.zapId;
//   const zap = await client.zap.findFirst({
//     where: {
//       id: zapId,
//       userId: id,
//     },
//     include: {
//       actions: {
//         include: {
//           type: true,
//         },
//       },
//       trigger: {
//         include: {
//           type: true,
//         },
//       },
//     },
//   });
//   return res.json({
//     zap,
//   });
// });
