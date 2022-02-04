import React from 'react';
import { Button, Col, Container, Image, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import landingBanner from '../../assets/images/landing-page-banner.png';

function LandingPageBanner() {
  return(
      <Container>
          <Row className='align-items-center'>
              <Col lg={6}>
                  <div className='landingPageBanner mt-5'>
                    <h3>Join with us</h3>
                    <h1><span>TechAdda</span> is ready to colleborate with all developer</h1>
                    <p>Hello developer, Welcome to <b>TechAdda</b>. What is actually <b>TechAdda</b>? Actually TechAdda is an Chatting application which dedicated for Developer Community.If you are interested or already a Developer you can <b>Create an free account!</b></p>
                    <Link to="/signup">
                        <Button className='theme-button-color mt-5'>create a free account</Button>
                    </Link>
                  </div>
              </Col>
              <Col lg={6}>
                  <Image src={landingBanner} className='mt-5 img-fluid'/>
              </Col>
          </Row>
      </Container>
  );
}

export default LandingPageBanner;
