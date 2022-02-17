import React, { useState } from 'react';
import { Button, Col, Container, Image, ListGroup, Row } from 'react-bootstrap';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import DashBoardNav from './DashBoardNav';
import userIcon from '../assets/images/placeholder.jpg';
import bgChatBox from '../assets/images/chatbox.gif';

function Dashboard() {
  const [userinfo, setUserInfo] = useState({});

  // dummy friend list
  const [friends, setFriends] = useState([
    {
      id:'SLK343LJLKJHJH2',
      profilePic: 'false',
      name: 'Fazlay Rabbi'
    },
    {
      id:'SLF43LJ223424HLKL',
      profilePic: 'false',
      name: 'Abdul Hai'
    },
    {
      id:'WRIUO3424LJOS',
      profilePic: 'false',
      name: 'GM Walid'
    },
    {
      id:'2LKJHOSJ3240',
      profilePic: 'false',
      name: 'MD Faruk'
    },
    {
      id:'SJL3OJ5242L0FOS',
      profilePic: 'false',
      name: 'SJ Sagor'
    },
    {
      id:'JFH42429274SFS',
      profilePic: 'false',
      name: 'Robel Srk'
    },
  ]);

  const [chatInfo, setChatInfo] = useState({chat:false, chatid:'',userName:'', profilePic: ''});
  let navigate = useNavigate();


  /// Login verification checking
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

  // Chat url setup
  const onClickChatURLHandler = (userObject) => {
    if(chatInfo.chat === true && chatInfo.chatid === userObject.id){
      setChatInfo({chat:false, chatid:'',userName:'', profilePic: ''})
    }else{
      setChatInfo({
        chat:true,
        chatid: userObject.id,
        userName: userObject.name,
        profilePic: userObject.profilePic,
      })
    }
  }

  return (
      <Container>
        <DashBoardNav />
        
        <Row className='mt-5'>
          <Col lg="2" className='p-0'>
          <ListGroup>
            {
              friends.map((friend, index) => (
                <ListGroup.Item 
                key={index}
                onClick={() => onClickChatURLHandler({id: friend.id, name: friend.name, profilePic: friend.profilePic})}
                className="cursor-pointer"
                >
                <Image 
                  className='user-profile-pic'
                  sizes='sm' 
                  src={friend.profilePic === 'false' ? userIcon: friend.profilePic }
                  />
                  <span className='ms-2'>{friend.name}</span>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
            {/* <div className="d-grid gap-2">
              {
                friends.map((friend, index) => (
                
                  // <div key={index} className="p-3 cursor-pointer bg-white d-block" onClick={() => onClickChatURLHandler({id: friend.id, name: friend.name, profilePic: friend.profilePic})}>
                  // <Image 
                  // className='user-profile-pic'
                  // sizes='sm' 
                  // src={friend.profilePic === 'false' ? userIcon: friend.profilePic }
                  // />
                  // <b className='ms-2'>{friend.name}</b>
                  // </div>
                ))
              }
              
              
            </div> */}
          </Col>
          <Col lg="10">
            {
              chatInfo.chat ? 
              <div className='chatbox-wrapper'>
                <div className='chat-header'>
                  <div className='friendInfo'>
                    <Image 
                    className='user-profile-pic'
                      sizes='sm' 
                      src={chatInfo.profilePic === 'false' ? userIcon : chatInfo.profilePic }
                    />
                    <b className='ms-2'>{chatInfo.userName}</b>
                  </div>
                </div>
                <div className='chat-content-box'>

                </div>
                <div className='chat-bottom'>
                  <input className='form-control' type="text" placeholder="Write your message..."/>
                  <Button variant='success' size='sm'>Send</Button>
                </div>
              </div> 
              :
              <div className='d-flex justify-content-center align-items-center'>
              <Image src={bgChatBox} />
            </div>
            }
          </Col>
        </Row>
      </Container>
  );
}

export default Dashboard;
