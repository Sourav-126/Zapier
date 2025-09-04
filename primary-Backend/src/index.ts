import express from "express";
import { userRouter } from "./routes/userRouter";
import { zapRouter } from "./routes/zapRouter";
import cors from "cors";
import { triggerRouter } from "./routes/triggerRouter";
import { actionRouter } from "./routes/actionRouter";

const app = express();

app.use(express.json());

app.use(cors({ origin: "*" }));
app.use("/api/v1/user", userRouter);

app.use("/api/v1/zap", zapRouter);
app.use("/api/v1/trigger", triggerRouter);
app.use("/api/v1/action", actionRouter);

app.listen("3000", () => {
  console.log("Primary Backend!");
});
