/**
 * API client for The Cat API
 *
 * Docs: https://docs.thecatapi.com/
 * API: https://api.thecatapi.com/v1/
 */
import axios from 'axios';
import { CatResponse } from "../types/TheCatApi.types";

const FAKE_DELAY = 1500

// Create a new axios instance
/* Skapande av axios-instans: Du använder axios.create() för att skapa en ny instans av axios med den konfiguration som du specificerar som ett objekt. */
/* 
    Skapa en axios instans, som man kan använda överallt det behövs inte med det är rekomenderat!
*/
const apiCats = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    timeout: 10000,
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
/* 
    GET request (behövs inte egentligen, men bra att använda det)
*/
// <T> = Type parameter - så kan den ta emot vad som helst. Skickar in något som ska komma tillbaka i samma typ
const get = async <T>(endpoint: string) => {
    const response = await apiCats.get<T>(endpoint)

    // Simulate a delay
    !!FAKE_DELAY && await new Promise(x => setTimeout(x, FAKE_DELAY))

    return response.data
}

/*
    GET  Random Cat Image
 */
// export const getRandomCatImage = async () => {

//     // Här använder man den get funktionen som finns ovanför
//     // Måste ge den en type paramets, i detta fall CatResponseTypes, annars 
//     // blir det unkown då den inte vet vad som skickas in utan T parameter
//  const data = await get<CatResponse>("images/search")

//  // Föväntar sig att alltid få tillbaka en katt med [0]
//  return data[0]
// }

/**
 * Get a random cat image by breed.
 *
 * @param {string} breed_id The ID of the breed.
 */
export const getRandomCatByBreed = async (breed_id = "") => {

    // Här använder man den get funktionen som finns ovanför
    // Måste ge den en type paramets, i detta fall CatResponseTypes, annars 
    // blir det unkown då den inte vet vad som skickas in utan T parameter
 const data = await get<CatResponse>("images/search?breed_ids=" + breed_id)

 // Föväntar sig att alltid få tillbaka en katt med [0]
 return data[0]
}

/**
 * Get random cat images
 */
export const getRandomCatImages = async (qty: number = 1) => {
    const queryParams = `?limit=${qty}`;

    const data = await get<CatResponse>("images/search" + queryParams);

    return data
} 


