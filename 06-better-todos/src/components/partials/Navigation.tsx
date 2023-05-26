import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink, Link } from "react-router-dom"

{/* 
* as betyder att man ska använda Link istället för a link, to={} iställer för href
<Navbar.Brand as={Link} to="/">TODOS ❖</Navbar.Brand> */}
/* Kallas för Single Page Application -SPA, */

const Navigation = () => {
  return (
    <>
       <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="/">TODOS ❖</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" /> 
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/todos">Todos</Nav.Link>
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    </>
  )
}

export default Navigation
