/**
 * API client for The Cat API
 *
 * Docs: https://docs.thecatapi.com/
 * API: https://api.thecatapi.com/v1/
 */

import axios from 'axios';
import { catResponseTypes } from '../types/catTypes.types'

/* Skapande av axios-instans: Du använder axios.create() för att skapa en ny instans av axios med den konfiguration som du specificerar som ett objekt. */
const apiCats = axios.create({
    baseURL: 'https://api.thecatapi.com/v1/',
    headers: {
        "Content-type": "application/json",
    },
})