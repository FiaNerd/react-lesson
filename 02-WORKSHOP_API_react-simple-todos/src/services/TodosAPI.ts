/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { Todos, Todo } from '../types'

const BASE_URL = 'http://localhost:3000'

/**
 * Get all todos
 */
export const getTodos = async () => {
	const res = await axios.get(`${BASE_URL}/todos`)
    console.log(res);
	return res.data as Todos
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const postTodo = async (data: Todo) => {
    const res = await axios.post(`${BASE_URL}/todos`, data)
    console.log("AXIOS Res", res)
    return res.data
}


/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
