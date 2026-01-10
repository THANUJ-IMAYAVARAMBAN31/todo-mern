const BASE_URL = "https://todo-mern-ytd9.onrender.com/api/todos";

export const getTodos = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

export const createTodo = async (title) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) throw new Error("Failed to create todo");
  return res.json();
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
export const markCompleted = async (id, completed) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  });

  if (!res.ok) throw new Error("Failed to mark completed");
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



