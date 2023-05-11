import { useEffect, useState } from 'react'
import { Todo, TodoList } from './types'
import './assets/scss/App.scss'
import TodoListItem from './components/TodoListItem'

function App() {
     // Måste ge den ett type argumnet <TodoList[]>
	const [todos, setTodos] = useState<TodoList>([
		{ title: "Make coffee", completed: true },
		{ title: "Drink coffee", completed: false },
		{ title: "Drink MOAR coffee", completed: false },
		{ title: "Drink ALL THE coffee", completed: false },
	])
	const [newTodoTitle, setNewTodoTitle] = useState("")

	const handleSubmit = (e: React.FormEvent) => {
		// stop form from submitting
		e.preventDefault()

		// create a new todo and set a new todos state
		const newTodo: Todo = {
			title: newTodoTitle,
			completed: false,
		}
		setTodos([...todos, newTodo])

		// clear newTodoTitle state
		setNewTodoTitle("")
	}

	const deleteTodo = (todoToDelete: Todo) => {
		// set a new list of todos where the clicked todo is excluded
		setTodos(todos.filter(todo => todo !== todoToDelete))
	}

	const toggleTodo = (todo: Todo) => {
		todo.completed = !todo.completed
		setTodos([...todos])
	}

	const unfinishedTodos = todos.filter(todo => !todo.completed)
	const finishedTodos = todos.filter(todo => todo.completed)

    useEffect(() => {
        console.log("Driving an empty array");
    }, []) // Denna med en tom array kommer att köras en gång och en gång endast, och det är den första gången och aldirg mer. Så den körs endast försat gången komponenten renderas.

    // Our first side effect (useEffect)
    useEffect(() => {
        console.log("Updating a page title using an effect");
        document.title = `${finishedTodos.length} of ${todos.length} completed`
    }, [ finishedTodos.length, todos.length ]) // Detta [ finishedTodos.length, todos.length ] är dependencies för att bevaka
    
    console.log("Rendering...");

	return (
		<div className="container">
			<h1 className="mb-3">React Simple Todos</h1>

			<form onSubmit={handleSubmit} className="mb-3">
				<div className="input-group">
					<input
						type="text"
						className="form-control"
						placeholder="Todo title"
						onChange={e => setNewTodoTitle(e.target.value)}
						value={newTodoTitle}
					/>

					<button
						type="submit"
						className="btn btn-success"
					>Create</button>
				</div>
			</form>

			{todos.length > 0 && (
				<>
                 {/* Om du har måsvingar iställt för paranterser så har du skapat en funktion  (todo, index) => (
                  <li></li> ), då måste man skriva return om du har måsvingar*/}
                <ul className="todolist">
                    {unfinishedTodos.map((todo, index) => (

                    // Den behöver key för att den ska veta vilken component som ändras
                    < TodoListItem todo={todo} key={index} />
					))}
				</ul>

				<ul className="todolist">
					{finishedTodos.map((todo, index) => (
                    // Får endast skicka in en title, då det är deklaraerat en interface i TodoListItem
					< TodoListItem todo={todo} key={index} />
					))}
				</ul>

					<p className="status">
						{finishedTodos.length} of {todos.length} todos completed
					</p>
				</>
			)}

			{todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}

		</div>
	)
}

export default App
