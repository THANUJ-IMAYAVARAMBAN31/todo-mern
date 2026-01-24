const BASE_URL = import.meta.env.VITE_API_URL;

export const getTodos = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const searchTodos = async (query) => {
  const res = await fetch(
    `${BASE_URL}/search?q=${encodeURIComponent(query)}`
  );
  return res.json();
};

export const createTodo = async (req, res) => {
  console.log("BODY RECEIVED:", req.body);
  console.log("HEADERS:", req.headers);

  const title = req.body?.title; 

  if (!title || typeof title !== "string") {
    return res.status(400).json({
      error: "Title is required and must be a string",
    });
  }

  try {
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (err) {
    console.error("Create todo error:", err);
    res.status(500).json({ message: err.message });
  }
};


export const deleteTodo = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete todo");
  }

  return await res.json();
};
export const markCompleted = async (id) => {
  const res = await fetch(
    `${BASE_URL}/${id}/complete`,
    {
      method: "PATCH",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to mark completed");
  }

  return res.json();
};

export const updateTodo = async (id, data) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update todo");
  return await res.json();
};



