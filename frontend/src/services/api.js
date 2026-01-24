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

export const createTodo = async (title) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    throw new Error("Failed to create todo");
  }

  return await res.json();
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



