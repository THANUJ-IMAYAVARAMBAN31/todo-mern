import express from "express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  markCompleted,
  searchTodos
} from "../controllers/todoController.js";

const router = express.Router();
router.get("/search",searchTodos);
router.get("/", getTodos); 
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.patch("/:id/complete", markCompleted);

export default router;
