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
            <Nav.Item className='me-5'>
              <Link to="/login/">
                <Button className='theme-button-color'>Login</Button>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/signup/">
                <Button className='theme-button-color'>SIGN UP</Button>
              </Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );;
}

export default Header;
