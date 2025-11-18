const express = require('express');
const cors = require('cors'); 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 

let todos = [
    { id: '1', text: 'Build the Backend code', completed: false },
    { id: '2', text: 'Build the Frontend code', completed: false }
];
let nextId = 3;


// GET: Retrieve all To-Do items
app.get('/todos', (req, res) => {
    res.json(todos);
});

// POST: Add a new To-Do item
app.post('/todos', (req, res) => {
    const newTodoText = req.body.text;
    if (!newTodoText) {
        return res.status(400).send({ error: 'Task text is required' });
    }

    const newTodo = {
        id: String(nextId++),
        text: newTodoText,
        completed: false
    };

    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// DELETE
app.delete('/todos/:id', (req, res) => {
    const idToDelete = req.params.id;
    const initialLength = todos.length;
    
    todos = todos.filter(todo => todo.id !== idToDelete);

    if (todos.length < initialLength) {
        res.status(200).send({ message: 'Task deleted successfully' });
    } else {
        res.status(404).send({ error: 'Task not found' });
    }
});

// 3. Start the Server
app.listen(PORT, () => {
    console.log(` Server running at http://localhost:${PORT}`);
});