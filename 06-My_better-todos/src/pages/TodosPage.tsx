import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Todo, Todos } from '../types'
import AddNewTodoForm from '../components/AddNewTodoForm'
import * as TodosAPI from '../services/TodosAPI'
import Alert from 'react-bootstrap/Alert';
import { ListGroup } from 'react-bootstrap';



const TodosPage = () => {
	const [todos, setTodos] = useState<Todos | null>(null)
    const location = useLocation()

    console.log("Location:", location);
    // console.log({location});

	// Get todos from api
	const getTodos = async () => {
		const data = await TodosAPI.getTodos()
		setTodos(data)
	}

	// Create a new todo in the API
	const addTodo = async (todo: Todo) => {
		await TodosAPI.createTodo(todo)
		getTodos()
	}

	// fetch todos when App is being mounted
	useEffect(() => {
        console.log("TodosPage is being mounted for the first time");
		getTodos()

        // Denna return kallas för en cleanup
        return () => {
            console.log("TodosPage is saying goodbye");
        }
	}, [])

	return (
		<>
			<h1 className="mb-3">Todos</h1>

			<AddNewTodoForm onAddTodo={addTodo} />

            { location.state?.message && (
                <Alert variant="success">
                    {location.state.message}
                </Alert>
            )}


            {/* Om du har null i hooken istället för en tom arry, så måste du ha todos här i denna
            annars kommer det inte funka, den blir en boolean, så om den är null så är den false */}
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
