import { Button, Form } from "react-bootstrap";


const SearchHackerNews = () => {
  return (
    <>
      <h1>Search 🔎</h1>
      <Form className="mb-4">
        <Form.Group className="mb-4">
            <Form.Control 
                type="text" 
                placeholder="Search for news" 
                required
            >
            </Form.Control>
        </Form.Group>

            <div className="d-flex justify-content-end">
				<Button
					variant="success"
					type="submit"
				>
                Search
                </Button>
			</div>
      </Form>
    </>
  );    
};

export default SearchHackerNews;