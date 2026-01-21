import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/api/todos", todoRoutes);
app.use(
  cors({
    origin: [
      "https://get-itdone.netlify.app", 
      "http://localhost:5173",
    ],
  })
);
const PORT = 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
