import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Header from './Header';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';


const ConfirmEmail = () => {
    const {state} = useLocation();
  return (
      <Container>
          <Header />
          <Row>
              <Col lg={12} className='d-flex justify-content-center mt-5'>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title className='text-center'>Successfuly Sent!</Card.Title>
                        <div className='text-center mt-3 mb-3'>
                        <FontAwesomeIcon icon={faCheckCircle} size='5x' color='green'/>
                        </div>
                        <Card.Text className='text-center'>
                            {state}
                        </Card.Text>
                        <Card.Text className='text-center'>
                        <Link className=' btn btn-dark text-center' to='/login'>Login</Link>
                        </Card.Text>
                            
                    </Card.Body>
                </Card>
              </Col>
          </Row>
      </Container>
  );
}

export default ConfirmEmail;
