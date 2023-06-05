import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import {Form, Alert} from 'react-bootstrap'
import ListGroup from 'react-bootstrap/ListGroup'
import {searchByDate as HN_searchByDate} from '../services/HackerNewsAPI' // denna är som alias
import { HN_SearchResponse } from '../types'

const SearchPage = () => {
	const [error, setError] = useState<string|null>(null)
	const [loading, setLoading] = useState(false)
    const [ page, setPage ] = useState(0)
	const [searchInput, setSearchInput] = useState("")
    const [ searchResult, setSearchResult ] = useState<HN_SearchResponse|null>(null)
    const queryRef = useRef("")


    const searchHackerNews = async (searchQuery: string, searchPage = 0) => {
        setError(null) // Nollställer Error
        setLoading(true)
        setSearchResult(null)

        // Save seacrQuery to queryRef
        // OBS!! Måste ha .current!!
        queryRef.current = searchQuery

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
        setPage(0)
        searchHackerNews(searchInput, 0)
	}

    // React changes in our page state
    useEffect(() => {
        if(!queryRef.current){
            return
        }

        searchHackerNews(queryRef.current, page)
    },[page])

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
        <p>Showing {searchResult.nbHits} search results for {queryRef.current}...</p>

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

        <div className="d-flex justify-content-between align-items-center">
            <div className="prev">
                <Button
                    variant="primary"
                    onClick={() => {setPage(prevValue => prevValue - 1)}}
                    disabled={page <= 0}
                >Previous Page</Button>
            </div>

            <div className="page">Page {searchResult.page + 1} / {searchResult.nbPages}</div>

            <div className="next">
                <Button
                    variant="primary"
                    onClick={() => { setPage(prevValue => prevValue + 1) }}
                    disabled={page + 1 >= searchResult.nbPages}
                    // onClick={ () => { searchHackerNews(queryRef.current, searchResult.page + 1)}}
                >Next Page</Button>
            </div>
        </div>
    </div>
)}
		</>
	)
}

export default SearchPage
