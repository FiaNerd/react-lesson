/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { Todo, Todos, PartialTodo } from '../types'

const BASE_URL = 'http://localhost:3000'

/**
 * Get all todos
 */
export const getTodos = async ():Promise<Todos> => {
	const res = await axios.get(`${BASE_URL}/todos`)
	return res.data
	// return res.data as Todos
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const createTodo = async (todo: Todo):Promise<Todos> => {
    const res = await axios.post(`${BASE_URL}/todos`, todo)
    return res.data
    // return res.data as Todos
}


/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
// export const toggleTodo = async (todo: Todo): Promise<Todo> => {
//     const res = await axios.put(`${BASE_URL}/todos/${todo.id}`, todo)
//     return res.data
// }

export const updateTodo = async (todo_id: number, data: PartialTodo): Promise<Todo> => {
	const res = await axios.patch(`${BASE_URL}/todos/${todo_id}`, data)
	return res.data
}


/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const deleteTodo = async (todo: Todo):Promise<Todo> => {
    const res = await axios.delete(`${BASE_URL}/todos/${todo.id}`)
    console.log("RES", res);
    return res.data
}