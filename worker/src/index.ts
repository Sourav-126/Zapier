require("dotenv").config();

import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";
import { JsonObject } from "@prisma/client/runtime/library";
import { parse } from "./parser";
import { sendEmail } from "./email";

const TOPIC_NAME = "quickstart-events";
const client = new PrismaClient();

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"],
});
async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();

  const producer = kafka.producer();
  await producer.connect();
  await consumer.subscribe({ topic: "quickstart-events", fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });
      if (!message.value?.toString()) {
        return;
      }

      const parsedValue = JSON.parse(message.value?.toString());
      const zapRunId = parsedValue.zapRunId;
      const stage = parsedValue.stage;

      const zapRunDetails = await client.zapRun.findFirst({
        where: {
          id: zapRunId,
        },
        include: {
          zap: {
            include: {
              actions: {
                include: {
                  type: true,
                },
              },
            },
          },
        },
      });

      const currentAction = zapRunDetails?.zap.actions.find(
        (x) => x.sortingOrder === stage
      );
      const zapRunMetadata = zapRunDetails?.metadata;

      if (!currentAction) {
        console.log("Action not Found");
      }
      if (currentAction?.type.id === "send-sol") {
        const amount = parse(
          (currentAction.metadata as JsonObject).amount as string,
          zapRunMetadata
        );
        const address = parse(
          (currentAction.metadata as JsonObject).address as string,
          zapRunMetadata
        );
        console.log(`Sending out SOL ${address} of amount ${amount} `);
      }
      if (currentAction?.type.id === "email") {
        const body = parse(
          (currentAction.metadata as JsonObject).body as string,
          zapRunMetadata
        );
        const to = parse(
          (currentAction.metadata as JsonObject).email as string,
          zapRunMetadata
        );
        await sendEmail(to, body);
        console.log(`Sending out email ${to} with  body ${body} `);
      }
      const lastStage = (zapRunDetails?.zap.actions.length || 1) - 1;

      if (lastStage !== stage) {
        await producer.send({
          topic: TOPIC_NAME,
          messages: [
            {
              value: JSON.stringify({
                stage: stage + 1,
                zapRunId,
              }),
            },
          ],
        });
      }
      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          partition: partition,
          offset: (parseInt(message.offset) + 1).toString(),
        },
      ]);
    },
  });
}

main();
