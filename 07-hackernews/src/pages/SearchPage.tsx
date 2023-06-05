import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import { Form, Alert } from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import { useSearchParams } from 'react-router-dom'
import { searchByDate as HN_searchByDate } from '../services/HackerNewsAPI' // denna är som alias
import { HN_SearchResponse } from '../types'
import Pagination from '../components/Pagination'

const SearchPage = () => {
	const [ error, setError ] = useState<string|null>(null)
	const [ loading, setLoading ] = useState(false)
    const [ page, setPage ] = useState(0)
	const [ searchInput, setSearchInput ] = useState("")
    const [ searchResult, setSearchResult ] = useState<HN_SearchResponse|null>(null)
    //const queryRef = useRef("") // denna sätts varje gång man gör en ny sökning.
    // useRef behövs inte längre då vi har serchParams istället
   
    // Skcikar in en deafault search param state
    // allt som sets i url ?=query
    const [ searchParams, setSearchParams ] = useSearchParams()

    // hämtar ut det som skriva i browsenr ?query= 
   const query = searchParams.get("query") as string

    console.log("serach params", searchParams);
    // get() hämtar ut ("") är nuckel
    // console.log("serach params", searchParams.get("funny"));


    const searchHackerNews = async (searchQuery: string, searchPage = 0) => {
        setError(null) // Nollställer Error
        setLoading(true)
        setSearchResult(null)

        // Save seacrQuery to queryRef
        // OBS!! Måste ha .current!!
        // queryRef.current = searchQuery

        try {
            const res = await HN_searchByDate(searchQuery, searchPage)
            setSearchResult(res)
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (err: any) {
            setError(err.message)
        }
        
        setLoading(false)
    }

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		// haxx0r
		if (!searchInput.trim().length) {
			return
		}

        // Search Hacker News
        // Går till sida 0 varje gång vi söker på något
        // searchHackerNews(serachInput, 0 )
        // reste page state
        setPage(0)

        // set input value as query in searchParams
        /* { query: searchInput } - den här delen är själva namnet som kommer sedan i 
        browsern, så man kan döpa den till q eller serach, då syns det i browsern
        */       
        setSearchParams({ query: searchInput }) //?query=apple

        // Denna behövs inte heller
        // searchHackerNews(searchInput, 0)
	}

    // React changes in our page state
    useEffect(() => {
        if(!query){
            return
        }

        searchHackerNews(query, page)
    },[query, page])

	return (
		<>
			<h1>🔎🔦👀</h1>

<Form className="mb-4" onSubmit={handleSubmit}>
    <Form.Group className="mb-3" controlId="searchQuery">
        <Form.Label>Search Query</Form.Label>
        <Form.Control
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Enter your search query"
            required
            type="text"
            value={searchInput}
        />
    </Form.Group>

    <div className="d-flex justify-content-end">
        <Button
            variant="success"
            type="submit"
            disabled={!searchInput.trim().length}
        >Search</Button>
    </div>
</Form>

{error && <Alert variant='warning'>{error}</Alert>}

{loading && <p>🤔 Loading...</p>}

{searchResult && (
    <div id="search-result">
        <p>Showing {searchResult.nbHits} search results for "{query}"...</p>

        <ListGroup className="mb-3">
            {searchResult.hits.map(hit => (
                <ListGroup.Item
                    action
                    href={hit.url}
                    key={hit.objectID}
                >
                    <h2 className="h3">{hit.title}</h2>
                    <p className="text-muted small mb-0">
                        {hit.points} points by {hit.author} at {hit.created_at}
                    </p>
                </ListGroup.Item>
            ))}
        </ListGroup>

        <Pagination
			page={searchResult.page + 1}
			totalPages={searchResult.nbPages}
			hasPreviousPage={page > 0}
			hasNextPage={page + 1 < searchResult.nbPages}
			onPreviousPage={() => { setPage(prevValue => prevValue - 1) }}
			onNextPage={() => { setPage(prevValue => prevValue + 1) }}
		/>
    </div>
)}
		</>
	)
}

export default SearchPage
