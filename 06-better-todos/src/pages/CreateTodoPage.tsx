import { useState } from 'react'
import { Todo } from '../types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'

const CreateTodoPage = () => {
	const [success, setSuccess] = useState<boolean | null>(null)

	
	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {
		await TodosAPI.createTodo(todo)

		//Check result and set seuccess
	}

	return (
		<>
			<h1 className="mb-3">Create a new Todo</h1>

			<AddNewTodoForm onAddTodo={addTodo} />
		</>
	)
}

export default CreateTodoPage
