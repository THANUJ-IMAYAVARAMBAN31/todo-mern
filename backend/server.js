import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();

// ✅ Must parse JSON bodies
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 4000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
