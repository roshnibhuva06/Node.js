import React, { useEffect, useState } from "react";
import "./App.css";   

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");

  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:3000/todos");
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!task.trim()) return alert("Please enter a task!");

    try {
      const res = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: task }),
      });

      const newTodo = await res.json();
      setTodos([...todos, newTodo]);
      setTask("");
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">React + Express To-Do App</h1>

      <div className="inputArea">
        <input
          className="input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
        />
        <button className="addBtn" onClick={addTodo}>Add</button>
      </div>

      <ul className="list">
        {todos.map((todo) => (
          <li key={todo.id} className="listItem">
            <span>{todo.text}</span>
            <button className="deleteBtn" onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
