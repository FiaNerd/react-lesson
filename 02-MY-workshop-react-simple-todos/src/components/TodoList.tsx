import React, { useState } from 'react'
import style from 'index.css'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, OutlinedInput  } from '@mui/material';

type Todo = {
    title: string,
    completed: boolean,
}

const TodoList = () => {
    const [ todos, setTodos] = useState<Todo[]>([])
    const [ newTodo, setNewTodo] = useState<string>("")

    const totalTask = todos.length;
    const unCompleted = todos.filter(todo => todo.completed === false);
    const completed = todos.filter(todo => todo.completed === true);

    console.log("Total", totalTask)
    console.log("UnCompleted", unCompleted)
    console.log("Completed", completed)


console.log(todos);
    const handleSubmitTodo = (e: React.FormEvent) => {
        e.preventDefault();

        setTodos((postNewTodo) => [
            ...postNewTodo,
            {
                title: newTodo, 
                completed: false,
            },
        ])

        setNewTodo("")
    }

    // const handleClick = (index: number) => (e: React.MouseEvent<HTMLLIElement>) => {
    //     e.preventDefault()
    //     const newTodos = [...todos]
    //     newTodos[index].completed = !newTodos[index].completed;
    //     setTodos(newTodos)
    //   };

    const handleClick = (index: number) => (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault()
        
        setTodos(todos.map((todo, i) => {
            return i === index ? { ...todo, completed: !todo.completed } : todo;
        }));
      };
      

    return(
      <div>
      <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmitTodo}
    >
      <FormControl >
        <InputLabel className="text-primary" htmlFor="component-outlined">todo</InputLabel>
        <OutlinedInput
            id="component-outlined"
            label="todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
        />

        <Button variant="outlined"  type="submit">Add Todo</Button>
      </FormControl>
    </Box>

    <h2>Your list</h2>

    <p>of total {totalTask}</p>
    {todos.length > 0 ? (
        <ul>
            {todos.map((item, index) => (
                <li className={item.completed ? "strike": ""} key={index}
                onClick={handleClick(index)}
                >
                    {item.title} - {item.completed ? 'Completed' : 'Not Completed'} 
                </li>
            ))}
        </ul>
) : ('Your list is empty. Nothing ToDo?')}

      </div>
    )
}

export default TodoList