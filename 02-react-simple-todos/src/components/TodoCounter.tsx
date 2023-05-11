import React from 'react'
import { TodoList } from '../types'

// Kort kommando för att skriva ut props och komponenter
type IProps = {
    todos: number
    finishedTodos: number
}

const TodoCounter: React.FC<IProps> = ({ todos, finishedTodos }) => {

  return (
    <p className="status">
    {finishedTodos} of {todos} todos completed
</p>
  )
}

export default TodoCounter