import { useEffect, useState } from 'react'
import { Todos } from '../types'
import Alert from 'react-bootstrap/Alert'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import AutoDismissingAlert from '../components/AutoDismissingAlert'
import * as TodosAPI from '../services/TodosAPI'

const TodosPage = () => {
	const [todos, setTodos] = useState<Todos|null>(null)
	const location = useLocation()
	const [searchParams, setSearchParams] = useSearchParams()
	const searchParams_deletedTodo = searchParams.get("deleted")
	const deletedTodo = Boolean(searchParams_deletedTodo)

	// Get todos from api
	const getTodos = async () => {
		const data = await TodosAPI.getTodos()

        //Sort Aplfabetical, sorterar efter svenska "sv"
        data.sort((a, b) => a.title.localeCompare(b.title, "sv"))

        // Sort by completed
        data.sort((a, b) => Number(a.completed) - Number(b.completed))

		setTodos(data)
	}

	// fetch todos when App is being mounted
	useEffect(() => {
		getTodos()
	}, [])

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			{location.state?.message && (
				<Alert variant="success">
					{location.state.message}
				</Alert>
			)}

			{deletedTodo && (
				<AutoDismissingAlert variant="success" hideAfter={3}>
					Todo was successfully deleted
				</AutoDismissingAlert>
			)}

			{todos && todos.length > 0 && (
				<ListGroup className="todolist">
					{todos.map(todo => (
						<ListGroup.Item
							action
							as={Link}
							key={todo.id}
							className={todo.completed ? 'done' : ''}
							to={`/todos/${todo.id}`}
						>
							{todo.title}
						</ListGroup.Item>
					))}
				</ListGroup>
			)}

			{todos && todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}
		</>
	)
}

export default TodosPage
