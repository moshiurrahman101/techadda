import React from 'react';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import loginBanner from '../assets/images/login-page.png';

function Login() {
  return (
      <Container>
          <Row className='align-items-center mt-5'>
              <Col lg={6}>
                  <Image src={loginBanner} className='mt-5 img-fluid'/>
              </Col>
              <Col lg={6}>
                <h1 className='mb-5'>Login to your account</h1>
                <Form style={{maxWidth:'400px'}}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Control type="email" placeholder="Email" />
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                  </Form.Group>
                  <Button className='theme-button-color' type="submit">
                    LOGIN
                  </Button>
                  <h6 className='mt-3'>Are You new? <Link to="/signup">Create an account</Link></h6>
                </Form>     
              </Col>
          </Row>
      </Container>
  );
}

export default Login;

