import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import Header from './Header';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import loginBanner from '../assets/images/login-page.png';
import firebaseConfig from '../firebaseconfig';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import {ToastContainer, toast} from 'react-toastify';


function Login() {

  let {state} = useLocation();
  const notify = () => toast(state);
  if(state){
    notify();
    state = '';
  }

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({type:"", message:{position:""}});
  const [buttonLoader, setButtonLoader] = useState(false);


  const onChangeEmailHandler = (e)=>{
    setEmail(e.target.value);
  }
  const onChangePasswordHandler = (e)=>{
    setPassword(e.target.value);
  }
  
  const onClickLoginHandler = (e) => {
    e.preventDefault();
    setButtonLoader(true);

    if(email === ''){
      setError({type:'danger', message:{position:'email', data:'Email address cannot empty!'} });
    }
    else if(password === ''){
      setError({type:'danger', message:{position:'password', data:'Password cannot empty!'} });
    }
    else if(password !== '' && password.length < 8){
      setError({type:'danger', message:{position:'password', data:'Password must be 8 charecter!'} });
    }else{
      // statement here...
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if(user.emailVerified){
          setError({type:'success', message:{position:'top', data:'Welcome! Login Successfuly.'} });
          navigate('/dashboard/')
        }else{
          navigate(`/signup-verification/`, {state: `${email}`});
        }
        
      })
      .catch((err)=>{
        const errorCode = err.code;
        if (errorCode.includes('auth/user-not-found')) {
          setError({type:'danger', message:{position:'top', data:'Invalid User!'} });
        }
        else if (errorCode.includes('auth/wrong-password')) {
          setError({type:'danger', message:{position:'top', data:'Worng information! Please try again.'} });
        }else{
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
        <ToastContainer />
          <Row className='align-items-center mt-5'>
              <Col lg={6}>
                  <Image src={loginBanner} className='mt-5 img-fluid'/>
              </Col>
              <Col lg={6}>
                <h1 className='mb-5'>Login to your account</h1>
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
                  
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control name='password' type="password" placeholder="Password" onChange={onChangePasswordHandler} />
                    {
                    error.message.position === "password"?
                    <Form.Text style={{color:'red'}}>{error.message.data}</Form.Text>
                    : "" 
                  }
                  </Form.Group>
                  <Button 
                  className='theme-button-color' 
                  type="submit"
                  onClick={onClickLoginHandler}
                  >
                    LOGIN&nbsp; 
                    {
                      buttonLoader ? 
                      <Spinner animation="border" variant="light" size="sm"/>
                      : ""
                    }
                  </Button>
                  <h6 className='mt-3'>Are You new? <Link to="/signup">Create an account</Link></h6>
                </Form>     
              </Col>
          </Row>
      </Container>
  );
}

export default Login;

