import { useEffect, useState } from 'react'
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

    // Create a Todo in API
	const addTodo = async (todo: Todo) => {

            await TodosAPI.createTodo(todo)
            getTodos()
       
		// setTodos([...todos, todo])
	}

	const deleteTodo = async (todoToDelete: Todo) => {
        await TodosAPI.deleteTodo(todoToDelete)
        console.log("TodoTODelete", todoToDelete);
        getTodos()

		// set a new list of todos where the clicked todo is excluded
		// setTodos(todos.filter(todo => todo !== todoToDelete))
	}

    const toggleTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Update a todo in the api
		await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})

		// Get all the todos from the api
		getTodos()
	}
	// 	// setTodos([...todos])
	

	// fetch todos when App is being mounted
    // useEffect monteras bara försa gången den renderas
	useEffect(() => {
		getTodos()
	}, [])

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
