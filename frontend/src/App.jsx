import "./App.css";
import React, { useState, useEffect } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  markCompleted,
} from "./services/api.js";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (error) {
      console.error("Failed to fetch todos", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
  if (!newTodo.trim()) return;

  try {
    const created = await createTodo(newTodo);
    setTodos([...todos, created]);
    setNewTodo("");
  } catch (error) {
    console.error(error);
    alert("Failed to create todo");
  }
};

  const handleDelete = async (id) => {
  try {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo._id !== id));
  } catch (error) {
    console.error(error.message);
  }
};
const handleToggleCompleted = async (todo) => {
  try {
    const updatedTodo = await markCompleted(todo._id);
    setTodos(
      todos.map((t) =>
        t._id === todo._id ? { ...t, completed: updatedTodo.completed } : t
      )
    );
  } catch (error) {
    console.error(error.message);
  }
};

 const handleSaveEdit = async (todo) => {
  if (!todo.title.trim()) return;
  try {
    const updated = await updateTodo(todo._id, { title: todo.title });
    setTodos(
      todos.map((t) => (t._id === todo._id ? { ...updated, isEditing: false } : t))
    );
  } catch (error) {
    console.error(error);
    alert("Failed to update todo");
  }
};
  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="todo-input">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add new todo"
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li className="todo-item" key={todo._id}>
            {todo.isEditing ? (
              <input
                value={todo.title}
                onChange={(e) =>
                  setTodos(
                    todos.map((t) =>
                      t._id === todo._id ? { ...t, title: e.target.value } : t
                    )
                  )
                }
              />
            ) : (
              <span
                 className={`todo-text ${todo.completed ? "completed" : ""}`}>
                 {todo.title}
                 </span>

            )}

            {todo.isEditing ? (
              <button onClick={() => handleSaveEdit(todo)}>Save</button>
            ) : (
              <>
                <button className="btn-complete" onClick={() => handleToggleCompleted(todo)}>
                  {todo.completed ? "Undo" : "Mark Completed"}
                </button>
                <button className="btn-edit"
                  onClick={() =>
                    setTodos(
                      todos.map((t) =>
                        t._id === todo._id ? { ...t, isEditing: true } : t
                      )
                    )
                  }
                >
                  Edit
                </button>
              </>
            )}

            <button className="btn-delete" onClick={() => handleDelete(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
