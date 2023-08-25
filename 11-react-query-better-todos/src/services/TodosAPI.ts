/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { PartialTodo, Todo, Todos } from '../types/TodosAPI.types'

const BASE_URL = 'http://localhost:3000'
const FAKE_DELAY = 1500

// Create a new axios instance
const instance = axios.create({
	baseURL: BASE_URL,
	timeout: 10000,
	headers: {
		"Content-Type": "application/json",
		"Accept": "application/json"
	}
})

/**
 * Execute a HTTP GET request to an endpoint.
 *
 * @param {string} endpoint Endpoint to HTTP GET
 * @returns Promise<T>
 */
const get = async <T>(endpoint: string) => {
	const response = await instance.get<T>(endpoint)

	// Simulate a delay
	!!FAKE_DELAY && await new Promise((r) => setTimeout(r, FAKE_DELAY))

	return response.data
}

/**
 * Get all todos
 */
// behöver inte ha async och await här då det enda den gör är att retunerar ett Promise av todos, så dumt att wrappa den runt en ny promise. Så har du redan async och await i instancen
// Samma med BASE_URL, då du redan har lagt BASE_URL inne i instancen, så behövs den inte här.. hannar blir det base_url samma två ggr i webbläsaren.
// export const getTodos = async () => {
// 	const res =  await get<Todos>(`${BASE_URL}/todos`)

//     return res.data
// }

/**
 * Get all todos
 */
export const getTodos = () => {
	return get<Todos>('/todos')
}

/**
 * Get a single todo
 *
 * @param todo_id Todo ID to get
 */
export const getTodo = (todo_id: number) => {
	return get<Todo>('/todos/' + todo_id)
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const createTodo = async (todo: Todo) => {
    try {
        const res = await axios.post<Todo>(`${BASE_URL}/todos`, todo);
        console.log('Create Todo Response:', res.data);
        return res.data;
    } catch (error) {
        console.error('Error creating todo:', error);
        throw error;
    }
};

/**
 * Update a todo
 *
 * @param todo_id Todo to update
 * @param data Data to update todo with
 */
export const updateTodo = async (todo_id: number, data: PartialTodo) => {
	const res = await axios.patch(`${BASE_URL}/todos/${todo_id}`, data)
	return res.data as Todo
}

export const toggleTodo = async (todo: Todo) => {
	const res = await axios.patch(`${BASE_URL}/todos/${todo.id}`, todo)
	return res.data as Todo
}

/**
 * Delete a todo
 *
 * @param todo_id Todo to delete
 */
export const deleteTodo = async (todo_id: number) => {
	const res = await axios.delete(`${BASE_URL}/todos/${todo_id}`)
	return res.data
}
