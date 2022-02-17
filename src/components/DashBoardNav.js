import React, { useState } from 'react';
import { Button, Image, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/images/TechAdda-Logo.png';
import {getAuth, signOut} from 'firebase/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMoon, faSun} from '@fortawesome/free-solid-svg-icons';

function DashBoardNav() {
    let navigate = useNavigate();
    const [theme, setTheme] = useState('light');
    // Logout Functionality
    const logoutHandler = (e) => {
        const auth = getAuth();
        signOut(auth).then(()=>{
            navigate('/login/', {state:"You are Logout!"});
        }).catch((error) => {
            console.log(error);
        });
    }

    // theme button handler
    const themeToggleHandler = (e) => {
      e.preventDefault();
      if (theme === 'light') {
        setTheme('dark');
      }else{
        setTheme('light');
      }
    }

  return (
    <Navbar  expand="lg">
      <Navbar.Brand href="#home">
        <Link to="/dashboard/">
          <Image src={logo} />
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className='align-items-center ms-auto'>
          <Nav.Item>
            <Link to="/profile/" className='link'>Profile</Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              {
                theme === 'light' ?
                <FontAwesomeIcon color='black' onClick={themeToggleHandler} icon={faMoon}/>
                :
                <FontAwesomeIcon color='yellow' onClick={themeToggleHandler} icon={faSun}/>
              }
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Button variant='danger' size='sm' onClick={logoutHandler}>Logout</Button>
            </Nav.Link>
          </Nav.Item>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default DashBoardNav