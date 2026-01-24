import Todo from "../models/todoModel.js";

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const searchTodos = async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || !q.trim()) {
      return res.status(400).json({ message: "Search query required" });
    }

    const todos = await Todo.find({
      title: { $regex: q, $options: "i" },
    });

    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const createTodo = async (req, res) => {
  console.log("BODY:", req.body);

  if (!req.body || typeof req.body.title !== "string") {
    return res.status(400).json({
      error: "Title is required",
    });
  }

  try {
    const todo = await Todo.create({ title: req.body.title });
    res.status(201).json(todo);
  } catch (err) {
    console.error("Create todo error:", err);
    res.status(500).json({ message: "Failed to create todo" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.status(200).json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const markCompleted = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findById(id);
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    todo.completed = !todo.completed;
    await todo.save();
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
