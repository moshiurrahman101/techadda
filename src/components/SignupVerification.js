import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';

const SignupVerification = () => {
    const {email} = useParams();
  return (
      <Container>
          <Row>
              <Col lg={12} className='d-flex justify-content-center mt-5'>
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Card.Title className='text-center'>Please Verify!</Card.Title>
                        <div className='text-center mt-3 mb-3'>
                        <FontAwesomeIcon icon={faCheckCircle} size='5x' color='green'/>
                        </div>
                        <Card.Text className='text-center'>
                            We already send a verification link on your email <b>{email}</b> Please Check and verify your email address! 
                        </Card.Text>
                    </Card.Body>
                </Card>
              </Col>
          </Row>
      </Container>
  );
}

export default SignupVerification;
