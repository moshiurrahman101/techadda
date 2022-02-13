import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Image, Row, Spinner } from 'react-bootstrap';
import Header from './Header';
import { Link, useNavigate } from 'react-router-dom';
import SignupBanner from '../assets/images/signup-page.png';
import firebaseConfig from '../firebaseconfig';
import {getAuth, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth"

function Signup() {
  const navigate = useNavigate();
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [agrrement, setAgrrement] = useState(false);
  const [buttonLoader, setButtonLoader] = useState(false);
  const [error, setError] = useState({type:"", message:{position:""}});


  const onChangeFnameHandler = (e)=>{
    setFname(e.target.value);
  }
  const onChangeEmailHandler = (e)=>{
    setEmail(e.target.value);
  }
  const onChangePasswordHandler = (e)=>{
    setPassword(e.target.value);
  }
  const onChangeCpasswordHandler = (e)=>{
    setCpassword(e.target.value);
  }
  const onChangeAgrrementHandler = (e)=>{
    setAgrrement(e);
  }

  const onClickHandler = (e) => {
    e.preventDefault();
    setButtonLoader(true);

    // Validation part
    if(fname === ''){
      setError({type:'danger', message:{position:'fname', data:'Full name cannot empty!'} });
    }
    else if(email === ''){
      setError({type:'danger', message:{position:'email', data:'Email address cannot empty!'} });
    }
    else if(password === ''){
      setError({type:'danger', message:{position:'password', data:'Password cannot empty!'} });
    }
    else if(password !== '' && password.length < 8){
      setError({type:'danger', message:{position:'password', data:'Password must be 8 charecter!'} });
    }
    else if(cpassword === ''){
      setError({type:'danger', message:{position:'cpassword', data:'Confirm password cannot empty!'} });
    }
    else if(agrrement === false){
      setError({type:'danger', message:{position:'agreement', data:'Must be agree with our terms and condition!'} });
    }
    else if(password !== cpassword){
      setError({type:'danger', message:{position:'cpassword', data:'Confirm Password dose not match!'} });
    }
    else{
      
      const auth = getAuth();
      
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user).then(()=>{
          console.log("Email send successfuly!")
        });
        setFname('');
        setEmail('');
        setPassword('');
        setCpassword('');
        setAgrrement(false);
        setError({type:"", message:{position:""}});
        navigate(`/signup-verification/`, {state: `${email}`});
      })
      .catch((err) => {
        const errorCode = err.code;
        if(errorCode.includes("auth/email-already-in-use")){
          setError({type:'danger', message:{position:'email', data:'Email address already exist!'} });
        }else{
          console.log(errorCode);
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
                  <Image src={SignupBanner} className='mt-5 img-fluid'/>
              </Col>
              <Col lg={6}>
                <h1 className='mb-5'>Create your account</h1>
                
              {
                error.message.position === "top"?
                <Alert variant={error.type}>
                    
                </Alert> 
                : "" 
              }
                <Form style={{maxWidth:'400px'}}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Control 
                   type="text"
                   placeholder="Your full name" 
                   onChange={onChangeFnameHandler}
                   />
                   {
                    error.message.position === "fname"?
                    <Form.Text style={{color:'red'}}>{error.message.data}</Form.Text>
                    : "" 
                  }
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                   <Form.Control 
                   type="email" 
                   placeholder="Email"
                   onChange={onChangeEmailHandler}
                   />
                   {
                    error.message.position === "email"?
                    <Form.Text style={{color:'red'}}>{error.message.data}</Form.Text>
                    : "" 
                  }
                  </Form.Group>
                  
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                    type="password" 
                    placeholder="Password"
                    onChange={onChangePasswordHandler}
                    />
                    {
                    error.message.position === "password"?
                    <Form.Text style={{color:'red'}}>{error.message.data}</Form.Text>
                    : "" 
                  }
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control 
                    type="password" 
                    placeholder="Confirm password" 
                    onChange={onChangeCpasswordHandler}
                    />
                    {
                    error.message.position === "cpassword"?
                    <Form.Text style={{color:'red'}}>{error.message.data}</Form.Text>
                    : "" 
                  }
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check 
                    type="checkbox"
                    label="Agree with our Terms & Condision"
                    onChange={(e) => onChangeAgrrementHandler(e.target.checked)}
                    />
                    {
                    error.message.position === "agreement"?
                    <Form.Text style={{color:'red'}}>{error.message.data}</Form.Text>
                    : "" 
                  }
                  </Form.Group>
                  <Button  
                  className='theme-button-color' 
                  type="submit"
                  onClick={onClickHandler}
                  >
                    SIGN UP&nbsp; 
                    {
                      buttonLoader ? 
                      <Spinner animation="border" variant="light" size="sm"/>
                      : ""
                    }
                  </Button>
                  <h6 className='mt-3'>Have an account? <Link to="/login">Login</Link></h6>
                </Form>     
              </Col>
          </Row>
      </Container>
  );
}

export default Signup;

