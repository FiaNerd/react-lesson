/**
 * Service for communicating with the json-server backend
 */
import axios from 'axios'
import { PartialTodo, Todo, Todos } from '../types/index.types'

const BASE_URL = 'http://localhost:3000'
const FAKE_DELAY = 1500

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
    }
})

const get = async <T>(endpoint: string) => {
    const res = await instance.get<T>(endpoint)

    // Simulate a delay
	!!FAKE_DELAY && await new Promise((r) => setTimeout(r, FAKE_DELAY))

    return res.data
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
 * 
 */
export const getTodos = () => {
	return get<Todos>(`/todos`)
}

// TODO: ÄNDRA DENNA MED, ta bort bla BASE_URL
/**
 * Get a single todo
 *
 * @param todo_id Todo ID to get
 */
export const getTodo = async (todo_id: number) => {
	const res = await axios.get(`${BASE_URL}/todos/${todo_id}`)
	return res.data[0]
}

/**
 * Create a new todo
 *
 * @param data Object with properties and values for the new todo
 */
export const createTodo = async (todo: Todo) => {
	const res = await axios.post(`${BASE_URL}/todos`, todo)
	return res.data as Todo
}

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
