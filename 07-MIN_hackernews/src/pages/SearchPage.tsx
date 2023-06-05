import { useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'

const SearchPage = () => {
    const [ error, setError ] = useState<string | null>(null)
    const [ loading, setLoading ] = useState(false)
    const [ serachInput, setSearchInput] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if(!serachInput.trim().length) {
            return
        }

        // Search Hacker News
        // Går till sida 0 varje gång vi söker på något
        // searchHackerNews(serachInput, 0 )
    }

  return (
    <>
      <h1>Search Here</h1>
        <Form className="mb-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="search-query">
            <Form.Label>Search query</Form.Label>
            <Form.Control 
                type="text" 
                placeholder="search" 
                required
                onChange={e => setSearchInput(e.target.value)}
                value={serachInput}
            />
        </Form.Group>

            <div className='d-flex justify-content-end'>
                <Button 
                    variant="success" 
                    type="submit" 
                    disabled={!serachInput.trim().length} >Search</Button>
            </div>
        </Form>

        { false && <p>🤓Loading...</p>}

        { true && (
            <div id="search-result">
                <p>Showing HITS search results for QUERY</p>

                <ListGroup className='mb-3'>
                    {[{}].map((hit) => (
                        <ListGroup.Item action href={''} key={''}>
                            <h2 className="h3">TITLE</h2>
                            <p className="text-muted small mb-0">POINTS points by AUTHOR at CREATED_AT</p>
                        </ListGroup.Item>
                    ))}
                </ListGroup>

                <div className="d-flex justify-content-between align-items-center">
                        <div className="prev">
                            <Button variant="primary">Previous Page</Button>
                        </div>

                        <div className="page">PAGE</div>

                        <div className="next">
                            <Button variant="primary">Next Page</Button>
                        </div>
                </div>
            </div>
        )}
    </>
  )
}

export default SearchPage
