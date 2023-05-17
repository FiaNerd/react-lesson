import { useEffect, useState } from 'react'
import { Todo, Todos  } from './types'
import './assets/scss/App.scss'
// import TodoListItem from './components/TodoListItem'
import TodoCounter from './components/my_TodoCounter'
import AddNewTodoForm from './components/AddNewTodoForm'
import TodoList from './components/TodoList'

function App() {
     // Måste ge den ett type argumnet <TodoList[]>
	const [ todos, setTodos ] = useState<Todos>([
		{ title: "Make coffee", completed: true },
		{ title: "Drink coffee", completed: false },
		{ title: "Drink MOAR coffee", completed: false },
		{ title: "Drink ALL THE coffee", completed: false },
	])

    const addTodo = (todo: Todo) => {
        setTodos([ ...todos, todo ])
    }
    
    const toggleTodo = (todo: Todo) => {
        todo.completed = !todo.completed
		setTodos([...todos])
	}
    

	const deleteTodo = (todoToDelete: Todo) => {
		// set a new list of todos where the clicked todo is excluded
		setTodos(todos.filter(todo => todo !== todoToDelete))
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

			< AddNewTodoForm 
                onAddTodo={addTodo}
            />

			{todos.length > 0 && (
				<>
                <TodoList 
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                todo={todos}
                key={index}/>
                 {/* Om du har måsvingar iställt för paranterser så har du skapat en funktion  (todo, index) => (
                  <li></li> ), då måste man skriva return om du har måsvingar*/}
                {/* <ul className="todolist">
                    {unfinishedTodos.map((todo, index) => (

                    // Den behöver key för att den ska veta vilken component som ändras
                    <TodoListItem
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todo={todo}
						key={index}
						/>
					))}
				</ul> */}

				{/* <ul className="todolist">
					{finishedTodos.map((todo, index) => (
                    // Får endast skicka in en title, då det är deklaraerat en interface i TodoListItem
					<TodoListItem
						onToggle={toggleTodo}
						onDelete={deleteTodo}
						todo={todo}
						key={index}
						/>
					))}
				</ul> */}

                    < TodoCounter 
                        finishedTodos= {finishedTodos.length}
                        todo={todos.length}
                    />
				</>
			)}

			{todos.length === 0 && (
				<p>Yayyy, you have 0 todos to do</p>
			)}

		</div>
	)
}

export default App
