import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router';

// function logOut() {
//   localStorage.clear();
//   window.location.pathname("/login")
// }

// let auth = localStorage.getItem("token");
// auth = JSON.parse(auth);
// console.log("auth", auth)

function Navb() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          <img
            src={require(".//logo.png")} // or "./assets/logo.png" if inside src and using import
            alt="MPIDC Logo"
            style={{ height: '40px' }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px', width: '100%' }}
            navbarScroll
          >

            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/login">login</Nav.Link>

            {/* <Nav.Link onClick={() => logOut()} as={Link} to="/login">login({auth.firstName})</Nav.Link> */}

            <NavDropdown title="User" id="navbarScrollingDropdown">
   <NavDropdown.Item as={Link} to="/Userlist">Userlist</NavDropdown.Item>
<NavDropdown.Item as={Link} to="/Useradd">User Add</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>

            <NavDropdown title="student" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/studentlist">studentlist</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/studentadd">student  add</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>

             <NavDropdown title="Marksheet" id="navbarScrollingDropdown">
              <NavDropdown.Item as={Link} to="/marksheetlist">Marksheetlist</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/marksheetadd">Marksheetadd</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />

            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Navb;