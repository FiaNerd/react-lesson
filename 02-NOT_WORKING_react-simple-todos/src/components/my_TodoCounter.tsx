import React from 'react'
import { Todo } from '../types'

interface IProps {
    finishedTodos: number
    todo: number
}

const TodoCounter: React.FC<IProps> = ({todo, finishedTodos}) => {
  return (
    <>
    <p className="status">
		{finishedTodos} of {todo} todos completed
	</p>
    </>
  )
}

export default TodoCounter
