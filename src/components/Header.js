import React from 'react';
import { Button, Container, Image, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/images/TechAdda-Logo.png';
function Header() {
  return (
    <Navbar  expand="lg">
      <Container>
        <Navbar.Brand href="#home">
          <Link to="/">
            <Image src={logo} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/signup">
              <Button className='theme-button-color'>SIGN UP</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );;
}

export default Header;
