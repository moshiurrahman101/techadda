import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';
import resetBanner from '../assets/images/reset-password.png';
import {getAuth, sendPasswordResetEmail} from 'firebase/auth';

function Resetpassword() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState({type:"", message:{position:""}});
  const [buttonLoader, setButtonLoader] = useState(false);
  const navigate = useNavigate();


  const onChangeEmailHandler = (e)=>{
    setEmail(e.target.value);
    setError({type:"", message:{position:""}});
  }
  
  
  // Login functinality...
  const onClickLoginHandler = (e) => {
    e.preventDefault();
    setButtonLoader(true);

    if(email === ''){
      setError({type:'danger', message:{position:'email', data:'Email address cannot empty!'} });
    }
    else{
        // statement here...
        const auth = getAuth();
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            // password reset email sent
            navigate(
                '/email-confirmation/', 
                {state: `We already send a reset link on your email ${email} Please Check and reset your password! 😊`}
            );
        })
        .catch((err)=>{
            const errorCode = err.code;
            if (errorCode.includes('auth/user-not-found')) {
                setError({type:'danger', message:{position:'top', data:'Invalid email address!'} });
            }
            else{
                setError({type:'danger', message:{position:'top', data:'Error from Server, Try again after sometime!'} });
            }
        })
    }

    setTimeout(()=>{
      setButtonLoader(false);
    },3000);
  }
  return (
    <Container>
        <Header/>
          <Row className='align-items-center mt-5'>
              <Col lg={6}>
                  <Image src={resetBanner} className='mt-5 img-fluid'/>
              </Col>
              <Col lg={6}>
                <h1 className='mb-5'>Enter your account email</h1>
                    {
                    error.message.position === "top"?
                    <Alert variant={error.type}>
                        {error.message.data}
                    </Alert> 
                    : "" 
                    }
                    <Form style={{maxWidth:'400px'}}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control name='email' type="email" placeholder="Email" onChange={onChangeEmailHandler}/>
                    {
                        error.message.position === "email"?
                        <Form.Text style={{color:'red'}}>{error.message.data}</Form.Text>
                        : "" 
                    }
                    </Form.Group>
                    <Button 
                        className='theme-button-color' 
                        type="submit"
                        onClick={onClickLoginHandler}
                        >
                        send reset link&nbsp; 
                        {
                            buttonLoader ? 
                            <Spinner animation="border" variant="light" size="sm"/>
                            : ""
                        }
                        </Button>
                    <h6 className='mt-3'>If you have no account? <Link to="/signup">Create an account</Link></h6>
                    </Form>  
              </Col>
          </Row>
      </Container>
  )
}

export default Resetpassword