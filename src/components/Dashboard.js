import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import DashBoardNav from './DashBoardNav';

function Dashboard() {
  const [userinfo, setUserInfo] = useState({});
  let navigate = useNavigate();
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if(user){
      if(user.emailVerified){
        setUserInfo(user);
      }else{
        navigate(`/signup-verification/`, {state: `${user.email}`});
      }
    }else{
      navigate('/login/', {state:"Please login!"});
    }
  });

  return (
      <Container>
        <DashBoardNav />
          <h1>Hey Developer, Welcome to your Dashboard!</h1>
          <b>Email: {userinfo.email}</b>
      </Container>
  );
}

export default Dashboard;
