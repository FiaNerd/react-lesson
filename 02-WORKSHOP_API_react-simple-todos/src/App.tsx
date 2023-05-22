import { useEffect, useState } from 'react'
import { Todo, Todos } from './types'
import './assets/scss/App.scss'
import TodoCounter from './components/TodoCounter'
import TodoList from './components/TodoList'
import AddNewTodoForm from './components/AddNewTodoForm'
import * as TodosAPI from './services/TodosAPI'


function App() {
	const [ todos, setTodos ] = useState<Todos>([])

	const getTodos = async () => {
        try{
            const allTodos = await TodosAPI.getTodos()
            setTodos(allTodos)
        }catch(err){
            console.log("Error getting Todos", err);
        }
	}


	const createTodo = async (todoToCreate: Todo) => {

        try{
            const createdTodo = await TodosAPI.createTodo(todoToCreate)
            setTodos([...todos, createdTodo])
        }catch(err){
            console.log("Error creating Todo", err);
        }
	}


	const deleteTodo = async (todoToDelete: Todo) => {
      
        try {
            await TodosAPI.deleteTodo(todoToDelete) 

            const refreshedTodos = await TodosAPI.getTodos()

            setTodos(refreshedTodos)
      
        } catch (err) {
            console.log("Error deleting todo", err);
        }
    }


    const toggleTodo = async (todoToUpdate: Todo) => {

        try {
           // Send a PATCH-request to the API for update the todo
            await TodosAPI.updateTodo({
                ...todoToUpdate,
                completed: !todoToUpdate.completed
          })

            const updatedTodos = await TodosAPI.getTodos()

            setTodos(updatedTodos)
        
        } catch (error) {
            console.error("Error updating todo:", error);
        }
    }

    // Händer bara första gången på inladdning av sidan 
    useEffect(() => {
        getTodos()
    }, [])


	const unfinishedTodos = todos.filter(todo => !todo.completed)
	const finishedTodos = todos.filter(todo => todo.completed)

	return (
		<div className="container">
			<h1 className="mb-3">React Simple Todos</h1>

			<AddNewTodoForm onAddTodo={createTodo} />

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
