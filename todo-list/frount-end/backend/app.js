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



// GET 
app.get('/todos', (req, res) => {
    console.log('GET request received for all todos');
    res.json(todos);
});

// POST
app.post('/todos', (req, res) => {
    const newTodoText = req.body.text;
    
    if (!newTodoText) {
        return res.status(400).send({ error: 'Task text is required in the request body.' });
    }

    const newTodo = {
        id: String(nextId++),
        text: newTodoText,
        completed: false
    };

    todos.push(newTodo);
    console.log(`POST request: Added new task: ${newTodo.text}`);
    res.status(201).json(newTodo); 
});

// DELETE 
app.delete('/todos/:id', (req, res) => {
    const idToDelete = req.params.id;
    const initialLength = todos.length;
    
   
    todos = todos.filter(todo => todo.id !== idToDelete);

    if (todos.length < initialLength) {
        console.log(`DELETE request: Removed task with ID: ${idToDelete}`);
        res.status(200).send({ message: 'Task deleted successfully' });
    } else {
        res.status(404).send({ error: `Task with ID ${idToDelete} not found.` });
    }
});



app.listen(3000, () => {
    console.log(` To-Do Backend API running at http://localhost:3000`);
 
});