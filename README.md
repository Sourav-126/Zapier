# ⚡ Zapier – Workflow Automation for Web3

A **Zapier-like automation platform** that lets users connect apps and create workflows using **Triggers → Actions**.
This project demonstrates how automation tools work under the hood with event-driven architecture, messaging, and reliable processing.

---

## 📂 Project Structure

```
zapier-clone/
│
├── hooks/              # Stores incoming webhooks & trigger events
├── processor/          # Processes workflows (runs actions after triggers)
├── zapier/             # Frontend (Next.js/React for UI)
├── primary-backend/    # Main backend (API, auth, DB, workflow logic)
├── worker/             # Background worker for Kafka event processing
└── README.md
```

---

## ✨ Features

* ⚡ **Trigger → Action workflows** (event-driven automation)
* 📩 Email + messaging integrations
* 💱 Solana-based crypto transactions
* 🗄️ Transactional Outbox Pattern for reliable event delivery
* 🔗 API-first approach for integrations
* 📊 Kafka-powered event streaming

---

## 🛠️ Tech Stack

* **Backend:** Node.js, Express, Prisma
* **Database:** PostgreSQL
* **Messaging/Event Bus:** Apache Kafka
* **Frontend:** Next.js
* **Blockchain:** Solana (crypto transactions)

---

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/your-username/zapier-clone.git
cd zapier-clone
```

### 2️⃣ Install dependencies (use pnpm)

```bash
pnpm install
```

### 3️⃣ Setup environment variables

Create `.env` files in relevant services (backend, worker, frontend). Example for `primary-backend/.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/zapier_clone
KAFKA_BROKER=localhost:9092
SMTP_USERNAME=your-email@example.com
SMTP_PASSWORD=your-smtp-password
SOLANA_SECRET_KEY=your-wallet-private-key
```

### 4️⃣ Run services

Run PostgreSQL & Kafka (via Docker):

```bash
docker-compose up -d
```

Start backend, worker, and frontend:

```bash
pnpm dev --filter primary-backend
pnpm dev --filter worker
pnpm dev --filter zapier
```

---

## ⚡ Example Workflow

1. **Trigger:** Receive a webhook from `hooks/`
2. **Processor:** Worker consumes the event from Kafka
3. **Action:** Sends an email, message, or Solana transaction

Example log output:

```
📩 New Trigger received (Webhook)  
✅ Event stored in DB (Transactional Outbox)  
⚡ Kafka message published → Worker picked up  
📤 Action executed: Email sent to user@example.com
```

