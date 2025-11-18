import React, { useEffect, useState } from "react";

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
    if (task.trim() === "") return alert("Please enter a task!");

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

  // Delete todo
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
    <div style={styles.container}>
      <h1 style={styles.heading}>React + Express To-Do App</h1>

   
      <div style={styles.inputArea}>
        <input
          style={styles.input}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter your task..."
        />
        <button style={styles.button} onClick={addTodo}>Add</button>
      </div>

      <ul style={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <span>{todo.text}</span>
            <button style={styles.deleteBtn} onClick={() => deleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;