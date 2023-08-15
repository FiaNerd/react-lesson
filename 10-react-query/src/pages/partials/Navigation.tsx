import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom'
/* Om du behöver importera både Link från Bootrstap och Link from React Router om så får mna skriva as,s å fattar React vilken som är vilken */
// import Link from 'react-bootstrap/Link'
// import {Link as RouterLink} from 'react-router-dom'

const Navigation = () => {
  return (
    /* md = från medium screen  bg = bak grund => mörk thema - data-bs-theme="dark"= mörk */
    <Navbar expand="md" bg="dark" data-bs-theme="dark">
      <Container>
        {/* med as={Link} så använder den Link från react-router-dom, men den använder fortfarande <Navbar.Brand  från bootrsap klasserna, och glöm inte att ändra till to="/" istället för href="/". Nu laddas nte sidan om när du går till en ny länk */}
        <Navbar.Brand as={Link} to="/">React Query</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {/* Så mycket automtiskt marginal i start (ms) - så lägger sig länkarna till höger så långt det går från loggon*/}
          <Nav className="ms-auto">
            {/* Ändra denna från Nav.Link från bootstrap till NavLink från react-router-dom (Detta för att <a /> länkar laddar om sidan, det gör det inte när man sätter to="") och samma här, ändra från href="/" till to="istället" */}
            <Nav.Link as={NavLink} to="/"> Home </Nav.Link>
           <Nav.Link as={NavLink} to="/random-cat">Random Cat</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  )
};

export default Navigation;

