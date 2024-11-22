import express from "express";
import { connectToDatabase } from "./database/db";
import userRoutes from "./routes/userRoutes";
const cors = require("cors");

const app = express();
const PORT = 5000;
app.use(
  cors({
    origin: ["http://localhost:3000"],

    credentials: true,
  })
);
app.use(express.json());
app.use("/api", userRoutes);

(async () => {
  const db = await connectToDatabase();

  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE
    )
  `);

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
})();
