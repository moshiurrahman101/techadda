import React from 'react';
import { Button, Image, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/TechAdda-Logo.png';
import {getAuth, signOut} from 'firebase/auth';

function DashBoardNav() {
    let navigate = useNavigate();
    const logoutHandler = (e) => {
        const auth = getAuth();
        signOut(auth).then(()=>{
            navigate('/login/', {state:"You are Logout!"});
        }).catch((error) => {
            console.log(error);
        });
    }
  return (
    <Navbar  expand="lg">
        <Navbar.Brand href="#home">
          <Link to="/">
            <Image src={logo} />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Item>
                <Button variant='danger' onClick={logoutHandler}>Logout</Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  )
}

export default DashBoardNav