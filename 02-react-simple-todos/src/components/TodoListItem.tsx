import React from 'react'
import { Todo} from '../types'


interface IProps {
    todo: Todo  // property todo måste vara av datatypen Todo (Todo kommer från types)
    onToggle: (todo: Todo) => void
    onDelete: (todo: Todo) => void
}

// Ärver från den ovanför 
// interface MeaProps extends IProps {
//     num: number
// }

// type IProps = {
//     title: string
// }
// type MegaProps = & IProps {
//     title: string
// }


// const TodoListItem = ({title}: IProps) => {

// React.FC står för React Function Component
// const TodoListItem: React.FC<IProps> = (props) => {
const TodoListItem: React.FC<IProps> = ({ todo, onToggle, onDelete }) => {
  
  
    
    return(
    <>
    <li className={todo.completed ? 'done' : ''} >
		<span className="todo-title">
			{todo.title}
		</span>
 <span className="ms-1">
		<span className="todo-toggle" onClick={() => onToggle(todo)} role="button">
		{todo.completed ? '☑️' : '✅'}
		</span>
		<span className="todo-delete" 
              onClick={() => onDelete(todo)} 
              role="button">
					🗑️
				</span>
		</span> 
	</li> 
    </>
    )
}

export default TodoListItem

