import React from 'react';
import { Col, Container, Image, Row } from 'react-bootstrap';
import dumImg from '../assets/images/bg-chatbox.png';
import {IoAddOutline} from 'react-icons/io5';
function Story() {
  return (
    <Container className='my-5'>
        <Row>
            <Col lg={1} md={1} sm={1}>
                <div className='textWrapper'>
                    Story
                </div>
            </Col>
            <Col lg={1} md={1} sm={1}>
                <div className='addStory'>
                    <IoAddOutline size={30}/>
                </div>
            </Col>
            <Col lg={1} md={1} sm={1}>
                <div className='storyWrapper'>
                    <Image src={dumImg}/>
                </div>
            </Col>
            <Col lg={1} md={1} sm={1}>
                <div className='storyWrapper'>
                    <Image src={dumImg}/>
                </div>
            </Col>
            <Col lg={1} md={1} sm={1}>
                <div className='storyWrapper'>
                    <Image src={dumImg}/>
                </div>
            </Col>
            <Col lg={1} md={1} sm={1}>
                <div className='storyWrapper'>
                    <Image src={dumImg}/>
                </div>
            </Col>
        </Row>
    </Container>
  )
}

export default Story