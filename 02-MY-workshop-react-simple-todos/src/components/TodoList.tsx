import React, { useState } from 'react'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { FormControl, InputLabel, OutlinedInput  } from '@mui/material';
// import InputLabel from '@mui/material/InputLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';

type Todo = {
    title: string,
    completed: boolean,
}

const TodoList = () => {
    const [ todos, setTodos] = useState<Todo[]>([])
    const [ newTodo, setNewTodo] = useState<string>("")

    const handleSubmitTodo = (e: React.FormEvent) => {
        e.preventDefault();

        // const postNewTodo: Todo = {
        //     title: newTodo,
        //     completed: false,
        // }

        // setTodos([...todos], postNewTodo)

        setTodos((postNewTodo) => [...postNewTodo,
            
            {
                title: newTodo, 
                completed: false,
            },
            
        ])

        setNewTodo("")
    }

    return(
      <div>
      <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
    >
      <FormControl onSubmit={handleSubmitTodo}>
        <InputLabel className="text-primary" htmlFor="component-outlined">todo</InputLabel>
        <OutlinedInput
          id="component-outlined"
        //   defaultValue="Enter todo"
          label="todo"
          value={newTodo}
          onChange= {(e) => setNewTodo(e.target.value)}
        />
        <Button variant="outlined" type="submit">Add Todo</Button>
      </FormControl>
    </Box>

    <h2>Your list</h2>
        { newTodo.length < 0 ? (
      <ul>
        {
            todos.map((item, index) => (
                <li key={index}>{item.title}{item.completed}</li>
            )
          )
        }
        </ul>
        ):('You list is empty. Nothing ToDo?')}
      </div>
    )

}
export default TodoList