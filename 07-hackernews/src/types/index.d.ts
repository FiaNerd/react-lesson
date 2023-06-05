
type HN_SearchHit = {
    created_at: string,
    title: string,
    url: string,
    author: string,
    points: number,
    story_text: string|null,
   /*  | <== pipe (kallase den för | ) */
   comment_text: string|null,
   num_comments: number,
   created_at_i: number,
   onjectID: string,
}

type HNSearchResponse = {
    hits: HN_SearchHit[],
    nbHits: number,
    page: number,
    nbPages: number,
    hitsPerPage: number,
}

// Interfacec kan ärva av varandra, det kan man med types också, men då får man göra en union