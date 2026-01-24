import "./App.css";
import React, { useState, useEffect } from "react";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  searchTodos,
  markCompleted,
} from "./services/api.js";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

const fetchTodos = async () => {
  const data = await getTodos();
  setTodos(data);
};
const handleSearch = async () => {
  if (!search.trim()) {
    fetchTodos(); 
    return;
  }

  const data = await searchTodos(search);
  setTodos(data);
};
  const handleAddTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const created = await createTodo(newTodo);
      setTodos([created, ...todos]);
      setNewTodo("");
    } catch (error) {
      alert("Failed to create todo");
    }
  };

  // DELETE TODO
  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      setTodos(todos.filter((t) => t._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // TOGGLE COMPLETE
  const handleToggleCompleted = async (todo) => {
  try {
    const updatedTodo = await markCompleted(todo._id);

    setTodos(
      todos.map((t) =>
        t._id === todo._id ? updatedTodo : t
      )
    );
  } catch (error) {
    console.error(error.message);
  }
};

  // SAVE EDIT
  const handleSaveEdit = async (todo) => {
    if (!todo.title.trim()) return;
    try {
      const updated = await updateTodo(todo._id, { title: todo.title });
      setTodos(todos.map((t) => (t._id === todo._id ? { ...updated, isEditing: false } : t)));
    } catch (error) {
      alert("Failed to update todo");
    }
  };

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>

      <div className="todo-input">
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search tasks..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {/* ADD */}
        <input
          type="text"
          placeholder="Add new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.length > 0 ? (
          todos.map((todo) => (
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
                <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
                  {todo.title}
                </span>
              )}

              {todo.isEditing ? (
                <button onClick={() => handleSaveEdit(todo)}>Save</button>
              ) : (
                <>
                  <button onClick={() => handleToggleCompleted(todo)}>
                    {todo.completed ? "Undo" : "Mark Completed"}
                  </button>
                  <button
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

              <button onClick={() => handleDelete(todo._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No todos found</p>
        )}
      </ul>
    </div>
  );
};

export default App;
