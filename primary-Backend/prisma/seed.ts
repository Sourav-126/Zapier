import { client } from "../src/db";

async function main() {
  // Seed Available Actions
  await client.availableActions.createMany({
    data: [
      {
        id: "email",
        name: "Email",
        image:
          "https://media.istockphoto.com/id/1125279178/vector/mail-line-icon.jpg?s=612x612&w=0&k=20&c=NASq4hMg0b6UP9V0ru4kxL2-J114O3TaakI467Pzjzw=",
      },
      {
        id: "sol",
        name: "Solana",
        image:
          "https://cdn.vectorstock.com/i/500p/04/45/solana-logo-coin-icon-isolated-vector-43670445.jpg",
      },
    ],
    skipDuplicates: true, // avoids crashing if already seeded
  });

  // Seed Available Triggers
  await client.availableTriggers.createMany({
    data: [
      {
        id: "webhook",
        name: "Webhook",
        image:
          "https://a.slack-edge.com/80588/img/services/outgoing-webhook_512.png",
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(() => {
    console.log("🌱 Seeding completed successfully");
  })
  .catch((e) => {
    console.error("❌ Error while seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await client.$disconnect();
  });
