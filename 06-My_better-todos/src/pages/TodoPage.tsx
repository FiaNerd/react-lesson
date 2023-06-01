import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Todo } from '../types'
import * as TodosAPI from '../services/TodosAPI'
import { Alert } from 'react-bootstrap'

const TodoPage = () => {
    const [loading, setLoading] = useState(true)
    const [ error, setError ] = useState<string | null>(null)
	const [todo, setTodo] = useState<Todo|null>(null)
	const { id } = useParams()
	const todoId = Number(id)
    const navigate = useNavigate()

	// Get todo from API
	const getTodo = async (id: number) => {
        setError(null)
        setLoading(true)

        try {
                    // call TodosAPI
                    const data = await TodosAPI.getTodo(id)

                    // update todo state with data
                    setTodo(data)
                } catch (err: any) {
                    // set Error message
                    setError(err)
            }

            setLoading(false)
        }
    

    // Delete a todo in the api
	const deleteTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Delete todo from the api
		await TodosAPI.deleteTodo(todo.id)

		// Get all the todos from the api
        // Navigate user to todo page
		// setTodo(deletedTodo)
        navigate('/todos', {
            replace: true,
            state: {
                message: {
                    type: `${todo.title} Was successfully deleted`,
                }
            }
        })
	}

	// Toggle the completed status of a todo in the api
	const toggleTodo = async (todo: Todo) => {
		if (!todo.id) {
			return
		}

		// Update a todo in the api
		const updatedTodo = await TodosAPI.updateTodo(todo.id, {
			completed: !todo.completed
		})

		// Get all the todos from the api
		setTodo(updatedTodo)

        // Ett annat sätt att uppdatera todo, men den andra är en snyggare lösning 
		// getTodo(todo.id)
	}

	useEffect(() => {
		if (typeof todoId !== "number") {
			return
		}

		getTodo(todoId)
	}, [todoId])

	if (loading || !todo) {
		return (<p>Loading...</p>)
	}

    if (error) {
		return (
			<Alert variant="warning">
				<h1>Something went wrong!</h1>
				<p>{error}</p>

				<Button variant='primary' onClick={() => getTodo(todoId)}>TRY AGAIN!!!</Button>
			</Alert>
		)
	}
	return (
		<>
			<h1>{todo.title}</h1>

			<p><strong>Status:</strong> {todo.completed ? 'Completed' : 'Not completed'}</p>

            <div className="buttons mb-3">
                <Button variant="success" onClick={() => toggleTodo(todo)}>Toggle</Button>
                <Button variant="warning">Edit</Button>
                <Button variant="danger" onClick={() => deleteTodo(todo)}>Delete</Button>
            </div>

			<Link to="/todos">
				<Button variant='secondary'>&laquo; All todos</Button>
			</Link>
		</>
	)
}

export default TodoPage
