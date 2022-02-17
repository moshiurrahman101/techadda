import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Image, Row, Spinner } from 'react-bootstrap'
import DashBoardNav from './DashBoardNav'
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import userIcon from '../assets/images/placeholder.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';


function Profile() {
    const [userInfo, setUserInfo] = useState({});
    const [preLoader, setPreLoader] = useState(true);

    // geting user
    const auth = getAuth();
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            setUserInfo({
                uid: user.uid,
                displayName: user.displayName,
                email: user.email,
                creationTime: user.metadata.creationTime,
            });
            setPreLoader(false);
        })
    },[]);
    
  return (
    <Container>
        <DashBoardNav />
        <Row className='mt-5'>
            <Col lg="12">
            {
                preLoader?
                <Spinner animation="border" variant="success" size='lg' />
                :
                <Card>
                    <Card.Body>
                        <Image src={userIcon} style={{width:'150px', height:'150px'}}/>
                        <div className='infoBox'>
                            <p>user id (*)</p>
                            <p><span>{userInfo.uid}</span></p>
                        </div>
                        <div className='infoBox'>
                            <p>Name</p>
                            <p><span>{userInfo.displayName}</span></p>
                        </div>
                        <div className='infoBox'>
                            <p>Email</p>
                            <p><span>{userInfo.email}</span> <FontAwesomeIcon icon={faCheckCircle} color="green"/></p>
                        </div>
                        <div className='infoBox'>
                            <p>Acount Created</p>
                            <p><span>{moment(`${userInfo.creationTime}`).fromNow()}</span></p>
                        </div>
                        <div className='infoBox'>
                            <Button variant='danger' size='lg'>Delete your Account!</Button>
                        </div>
                        
                    </Card.Body>
                </Card>
            }
            
            </Col>
        </Row>
    </Container>
  )
}

export default Profile