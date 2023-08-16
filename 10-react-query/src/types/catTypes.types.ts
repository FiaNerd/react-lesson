export type CatTypes = {
    id: string,
    url: string,
    width: number,
    height: number,
}

/* Genom att använda catResponseTypes, som helt enkelt är en array av Cat-objekt, kan du på ett enkelt sätt ange hur svaret från API:et bör se ut. */
export type CatResponseTypes =  CatTypes[]