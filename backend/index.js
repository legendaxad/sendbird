import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./src/config/db.js";
import { router } from "./src/routes/index.js";
import { errorMiddleware } from "./src/middleware/authMiddleware.js";
dotenv.config();

const app = express();

void connectDB();
app.use(express.json());

app.use(cors({ credentials: true, origin: "*" }));
app.use("/", router);
app.use(errorMiddleware);
const PORT = 7722;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
