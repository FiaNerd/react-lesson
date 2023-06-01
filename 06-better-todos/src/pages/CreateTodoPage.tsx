import { useState } from 'react'
import { Todo } from '../types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import { Alert } from 'react-bootstrap'

const CreateTodoPage = () => {
	const [success, setSuccess] = useState<boolean | null>(null)

	
	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {
        try {
            const createdTodo = await TodosAPI.createTodo(todo)

            // KOnventerar om createdTodo till boolan via två !! utropstecken
            setSuccess(!!createdTodo)

            // Es-lint.-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setSuccess(false)
        }
	}

	return (
		<>
			<h1 className="mb-3">Create a new Todo</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

            {success === true && (
                <Alert variant="success" className='mt-3'>Todo Created</Alert>
            )}

            {success === false && (
                <Alert variant="warning" className='mt-3'>Todo Could Not Be Created</Alert>
            )}
		</>
	)
}

export default CreateTodoPage
