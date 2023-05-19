import { cloneElement, useEffect, useState } from 'react'
import { Todo, Todos } from './types'
import './assets/scss/App.scss'
import TodoCounter from './components/TodoCounter'
import TodoList from './components/TodoList'
import AddNewTodoForm from './components/AddNewTodoForm'
import * as TodosAPI from './services/TodosAPI'

function App() {
	const [todos, setTodos] = useState<Todos>([])

	const getTodos = async () => {
		const data = await TodosAPI.getTodos()
		setTodos(data)
	}


	const addTodo = async (todo: Todo) => {
        const data = await TodosAPI.postTodo(todo)
		setTodos([...todos, data])
	}


	const deleteTodo = async (todoToDelete: Todo) => {
        const todoId = todoToDelete.id;
      
        try {
          const data = await TodosAPI.deleteTodo(todoToDelete) //

          console.log("Data deleted", data);
      
          const filteredTodos = todos.filter((todo) => todo.id !== todoId)

          setTodos(filteredTodos)

          console.log("FILTERED", filteredTodos);
      
        } catch (err) {
          console.log("Error deleting todo", err);
        }
      }



    const toggleTodo = async (todo: Todo) => {
        const todoId = todo.id;
      
        try {

            // Send a PATCH-request to the API for update the todo
          const updatedTodo = await TodosAPI.patchTodo({
            ...todo,
            completed: !todo.completed
          });
      
          console.log("Updated  todo:", updatedTodo);
      
          // Update todos in the state 
          const updatedTodos = todos.map(todo => {
            if (todo.id === todoId) {
              return updatedTodo; //Use the updated todo from the API
            }
            return todo;
          });
      
          setTodos(updatedTodos)
      
        } catch (error) {
          console.error("Error updating todo:", error);
        }
    }


    useEffect(() =>  {
        const removeTodo = async () => {

            try {
                const data = await TodosAPI.getTodos()
                
                setTodos(data)

                // if(todos.length > 0) {
                //     deleteTodo(todos[0])
                // }
            
                
            } catch (err) {
                console.log("Error getting todos", err);
            }   
        }
        removeTodo();
    },[])
   
      

	// fetch todos when App is being mounted
	useEffect(() => {
		getTodos()
	}, [])


    useEffect(() => {
        const addAndFecthTodos = async () => {
          try {
            // Get the todo from the API
            const todos = await TodosAPI.getTodos() 
            // Update state with the fetched todo
            setTodos(todos) 
          } catch (error) {
            console.error("Error fetching todos:", error);
          }
        }
             addAndFecthTodos()
      }, [])




      useEffect(() => {
        const updateTodo = async () => {
            try {
                const todos = await TodosAPI.getTodos() // Hämta todos från API:et
                setTodos(todos) // Uppdatera din state med de hämtade todos
                console.log(todos);
            } catch (error) {
                console.error("Error fetching todos:", error);
            }
        }
            updateTodo()
      },[])



	const unfinishedTodos = todos.filter(todo => !todo.completed)
	const finishedTodos = todos.filter(todo => todo.completed)

	// console.log("App rendering...")

	return (
		<div className="container">
			<h1 className="mb-3">React Simple Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

			{todos.length > 0 && (
				<>
					<TodoList
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todos={unfinishedTodos}
					/>

					<TodoList
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todos={finishedTodos}
					/>

					<TodoCounter finished={finishedTodos.length} total={todos.length} />
				</>
			)}

			{todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}

		</div>
	)
}

export default App
