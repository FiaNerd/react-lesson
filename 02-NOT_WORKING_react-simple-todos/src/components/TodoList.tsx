import React from 'react'
import TodoListItem from './TodoListItem';
import { Todo } from '../types';

interface IProps{
    onToggle: (todo: Todo) => void
    onDelete: (todoDelete: Todo) => void
    todos: Todo[]
}

const TodoList: React.FC<IProps> = ({ onToggle, onDelete, todos}) => {
  return (
    <>

       {/* Om du har måsvingar iställt för paranterser så har du skapat en funktion  (todo, index) => (
                  <li></li> ), då måste man skriva return om du har måsvingar*/}
                <ul className="todolist">
                    {todos.map((todo, index) => (

                    // Den behöver key för att den ska veta vilken component som ändras
                    <TodoListItem
						onToggle={onToggle}
						onDelete={onDelete}
						todo={todo}
                        key={index}
						/>
					))}
				</ul>
{/* 
                <ul className="todolist">
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
    </>
  )
}

export default TodoList
