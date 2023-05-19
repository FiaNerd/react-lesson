/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { Todo, Todos } from '../types'

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
    return res.data as Todo
}


/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */

export const deleteTodo = async ( todo: Todo ) => {
    const res = await axios.delete(`${BASE_URL}/todos/${todo.id}`)

    // console.log("Res DELETE", res, "RES Data", res.data);

    return res.data as Todo
}


/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const patchTodo = async ( todo: Todo ) => {
    const res = await axios.patch(`${BASE_URL}/todos/${todo.id}`, todo)
    return res.data as Todo
}
