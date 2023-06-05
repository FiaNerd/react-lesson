export type HN_SearchHit = {
	created_at: string
	title: string
	url: string
	author: string
	points: number
	story_text: string|null
	comment_text: string|null
	num_comments: number
	created_at_i: number
	objectID: string
}

/*  | <== pipe (kallase den för | ) */

export type HN_SearchResponse = {
	hits: HN_SearchHit[]
	nbHits: number
	page: number
	nbPages: number
	hitsPerPage: number
}


// Interfacec kan ärva av varandra, det kan man med types också, men då får man göra en union