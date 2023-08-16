/**
 * API client for The Cat API
 *
 * Docs: https://docs.thecatapi.com/
 * API: https://api.thecatapi.com/v1/
 */
import axios from 'axios';
import { CatResponseTypes } from "../types/CatTypes.types";

const FAKE_DELAY = 15000

// Create a new axios instance
/* Skapande av axios-instans: Du använder axios.create() för att skapa en ny instans av axios med den konfiguration som du specificerar som ett objekt. */
const apiCats = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    timeout: 1000,
    // headers: {
    //     "Content-type": "application/json",
    // },
})

/**
 * Execute a GET request
 */
/* Instance of get with generic type <T> */
/* Du definierar en generisk get-funktion som utför GET-begäranden till API:et. */
/* const get = async <T> (endpoint: string, queryParams?: string) => {

    const getEndpoints = queryParams ? `${endpoint}${queryParams}` : endpoint;

    const response = await apiCats.get<T>(getEndpoints)
    
    return response.data
} */

const get = async <T> (endpoint: string) => {
    const response = await apiCats.get<T>(endpoint)
    !!FAKE_DELAY && await new Promise(x => setTimeout(x, FAKE_DELAY))
    
    return response.data
}

export const getRandomCatImage = async () => {
 const data = await get<CatResponseTypes>("images/search")

 return data[0]
}

/**
 * Get random cat images
 */
export const getRandomCatImages = async (qty: number = 1) => {
    const queryParams = `?limit=${qty}`;

    const data = await get<CatResponseTypes>("images/search" + queryParams);

    return data
} 