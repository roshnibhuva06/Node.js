const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let todos = [
    { id: '1', text: 'Finish Backend API', completed: false },
    { id: '2', text: 'Connect Frontend to API', completed: false }
];
let nextId = 3;

// 👉 Root route (homepage)
app.get("/", (req, res) => {
  res.send("Todo API is running. Use /todos to get data.");
});

// GET all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST new todo
app.post('/todos', (req, res) => {
    const newTodoText = req.body.text;

    if (!newTodoText) {
        return res.status(400).send({ error: 'Task text is required.' });
    }

    const newTodo = {
        id: String(nextId++),
        text: newTodoText,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// DELETE todo
app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    const initialLen = todos.length;

    todos = todos.filter(todo => todo.id !== id);

    if (todos.length < initialLen) {
        res.send({ message: 'Task deleted successfully' });
    } else {
        res.status(404).send({ error: 'Task not found' });
    }
});

app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
});
