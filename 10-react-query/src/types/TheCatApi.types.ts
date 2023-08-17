/**
 * The Cat API Types
 */
/* Man ska altid döpa filen till types.ts, och INTE d.ts
    exemepl TheCatApi.types.ts och INTE TheCatApi.d.ts
    Det har att göra med typescript. 
*/
export type Cat = {
    id: string,
    url: string,
    width: number,
    height: number,
}

/* Genom att använda catResponseTypes, som helt enkelt är en array av Cat-objekt, kan du på ett enkelt sätt ange hur svaret från API:et bör se ut. */
// Vet om att svarat som kommer tillbaka är en array av Cat-objekt
export type CatResponse =  Cat[]

export type Breed = {
    id: string, 
    name: string,
}