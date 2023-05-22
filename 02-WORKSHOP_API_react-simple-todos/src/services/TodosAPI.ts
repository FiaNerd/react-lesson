/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { Todo, Todos } from '../types'

const BASE_URL = 'http://localhost:3000'

/**
 * Get all todos
 */
export const getTodos = async ():Promise<Todos> => {
	const allTodos = await axios.get(`${BASE_URL}/todos`)
	return allTodos.data
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const createTodo = async (todoToCreate: Todo):Promise<Todo> => {
    const createdTodo = await axios.post(`${BASE_URL}/todos`, todoToCreate)
    return createdTodo.data
}


/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const deleteTodo = async ( todoToDelete: Todo ):Promise<Todo> => {
    const deletedTodo = await axios.delete(`${BASE_URL}/todos/${todoToDelete.id}`)
    return deletedTodo.data
}


/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const updateTodo = async ( todoToUpdate: Todo ):Promise<Todo> => {
    const updatedTodo = await axios.patch(`${BASE_URL}/todos/${todoToUpdate.id}`, todoToUpdate)
    return updatedTodo.data
}
