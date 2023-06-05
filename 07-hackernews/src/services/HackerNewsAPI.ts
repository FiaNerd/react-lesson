/**
 * Hacker News API service
 *
 * <https://hn.algolia.com/api>
 */

import axios from 'axios'

/**
 * Execute a HTTP GET request to an endpoint.
 *
 * @param {string} endpoint Endpoint to HTTP GET
 * @returns Promise
 */
const get = async <T>(endpoint: string):Promise<T> => {
	const response = await axios.get(endpoint)
	return response.data
	// return response.data as T
}

/**
 * Search Hacker News stories
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const search = async (query: string, page: number) => {
	return get<any>(`/search=${query}&tags=story&page=${page}`)
}

/**
 * Search Hacker News stories
 *
 * @todo Replace any with correct type definition 😱!
 *
 * @param {string} query Search query to search for
 * @param {number} page Page of search results to get
 * @returns Promise
 */
export const searchByDate = async (query: string, page: number) => {
	return get<any>(`/search_by_date?query=${query}&tags=story&page=${page}`)
}
