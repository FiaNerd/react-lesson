import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavLink, Link } from 'react-router-dom'

// Todo: Remove to a partial folder
const Navigation = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">📝 Better Todos</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/">Home</Nav.Link>
                    {/* end = används för att man inte ska kunna ha hela todos active, det är för att både url böjrar 
                    ned /todos så då blir båda aktiva även om det är /todos/create , så todos ska inte vara aktiv bara för att 
                    det är samma url i början*/}
						<Nav.Link as={NavLink} to="/todos" end>Todos</Nav.Link>
						<Nav.Link as={NavLink} to="/todos/create">Create Todo</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default Navigation
