// src/server.ts
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { initDB } from "./config/db.js";
import transactionsRoute from "./routes/transactionsRoute.js";
import rateLimiter from "./middleware/rateLimiter.js";
import job from "./config/cron.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === "production") job.start();
// middleware
app.use(cors({ origin: "*" }));
app.use(rateLimiter);
app.use(express.json());



app.use("/api/transactions", transactionsRoute);
app.get("/", (req, res) => {
  res.send("Wallet Backend Server is running!");
})
initDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  });
