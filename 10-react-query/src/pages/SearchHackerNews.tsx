import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, Button, Form, ListGroup } from "react-bootstrap";
import { search } from "../services/TheHackerNewsApi";

const SearchHackerNews = () => {
    const [searchResult, setSearchResult] = useState("")
    
    const { data, error, isLoading, isFetching, refetch } = useQuery({
        queryKey: ['search-news', `search?${searchResult}`],
        queryFn: () => search(searchResult)
    }) 

    console.log(searchResult)
  return (
    <>
      <h1>Search 🔎</h1>
      <Form className="mb-4" onSubmit={() => refetch()}>
        <Form.Group className="mb-4">
            <Form.Control 
                type="text" 
                placeholder="Search for news" 
                required
                onChange={e => setSearchResult(e.target.value)}
            >
            </Form.Control>
        </Form.Group>

            <div className="d-flex justify-content-end">
				<Button
					variant="success"
					type="submit"
                    disabled={isFetching}
				>
                 {isFetching ? "Searching..." : "Search"}
                </Button>
			</div>
      </Form>

      {error && <Alert variant='warning'>Not working</Alert>}

			{isLoading && <p>🤔 Loading...</p>}

			{searchResult && (
				<div id="search-result">
					<p>Showing {data?.nbHits} search results for "{data?.hitsPerPage}"pages...</p>

		<ListGroup className="mb-3">
			{data?.hits.map(hit => (
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
        </div>
		)}
    </>
  );    
};

export default SearchHackerNews;