import React, { useEffect, useRef, useState } from 'react';
import { Button, Col, Container, Image, ListGroup,  Row, Spinner, } from 'react-bootstrap';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import DashBoardNav from './DashBoardNav';
import userIcon from '../assets/images/placeholder.jpg';
import bgChatBox from '../assets/images/chatbox.gif';
import {getDatabase, ref, onValue, push, set, remove, } from 'firebase/database';
import {IoMdRemoveCircleOutline} from 'react-icons/io';
import {MdPhoto} from 'react-icons/md';
import UsersList from './UsersList';


function Dashboard() {

  const db = getDatabase();
  const [userinfo, setUserInfo] = useState({});
  const [myParentKey, setMyParentKey] = useState('');
  const [friends, setFriends] = useState([]);
  const [activeFriends, setActiveFriends] = useState(null);
  const [chatInfo, setChatInfo] = useState({chat:false, chatid:'',userName:'', profilePicUrl: ''});
  const [inputMessage, setInputMessage] = useState('');
  const [allMessage, setAllMessage] = useState([]);
  const [buttonDisable,setButtonDisable] = useState(true);
  const [messagePreLoader, setMessagePreLoader] = useState(true);
  let navigate = useNavigate();

  // scroll issue
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  const messageDeleteClickHandler = (id) => {
    setMessagePreLoader(true);
    
    const db = getDatabase();
    // statement
    const messageDeleteRef = ref(db, `messages/${id}`);
    remove(messageDeleteRef).then(
      getMessage().then(
      setMessagePreLoader(false)  
      ));
  }
  

  /// Getting all message from DB
  const getMessage = async () =>{
    const mDataRef =  ref(db, '/messages');
    let messageArray = [];
    onValue(mDataRef,(snapshot)=>{
      snapshot.forEach((message) => {
        let msg = {
          key: message.key,
          message: message.val().message,
          uid: message.val().uid,
          senderName: message.val().senderName,
        }
        messageArray.push(msg);
      })
    })
    
    setAllMessage(messageArray);  

  }

  /// Getting users function from DB
  const getData = async () =>{
    const dataRef = await ref(db, '/users');
    let userArray = [];
    onValue(dataRef, (snapshot) => {
      snapshot.forEach((user) => {
        if (myParentKey === '' && user.val().uid === userinfo.uid) {
          setMyParentKey(user.key);
        }
          let sduser = {
            email: user.val().email,
            name: user.val().name,
            profilePicUrl: user.val().profilePicUrl,
            uid: user.val().uid,
            parentId: user.key,
          }
          userArray.push(sduser);
      });

      setFriends(userArray);
    });

    setInterval(()=>{
      setMessagePreLoader(true);
      getMessage().then(
        setMessagePreLoader(false)  
      );
    },1000);
    
  }
  
  

  useEffect(()=>{
    getData();    
  },[]);

  useEffect(()=>{
    scrollToBottom();    
  },[allMessage]);




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
    if(activeFriends === userObject.id){
      setChatInfo({chat:false, chatid:'',userName:'', profilePicUrl: ''})
    }else{
      setActiveFriends(userObject.uid);
      setChatInfo({
        chat:true,
        chatid: userObject.uid,
        userName: userObject.name,
        profilePicUrl: userObject.profilePicUrl,
      });
    }
  }

  // Input Message hander
  const inputMessageChangeHandler = (e) => {
    setInputMessage(e.target.value);
    setButtonDisable(false);
  }

  const inputMessageClickHandler = (e) => {
    e.preventDefault();
    
    if(inputMessage !== ''){
      const postListRef = ref(db, 'messages');
      const newPostRef = push(postListRef);
      set(newPostRef,{
        uid: userinfo.uid,
        message: inputMessage,
        senderName: userinfo.displayName,
        parentKey: myParentKey,
      });
      scrollToBottom();
      setInputMessage('');
    }else{
      setButtonDisable(true);
    }
  }


  /// Input file uploading methods
  const inputFile = useRef(null);
  const sendImageFile = () => {
    inputFile.current.click();
    console.log("Done!");
  }


return (
      <Container>
        <DashBoardNav />
        
        <Row className='mt-5'>
          <Col lg="2" className='p-0'>
          <h6>Friends</h6>
          <ListGroup className='friendsBox'>
            {
              friends.map((friend, index) => (
                <ListGroup.Item 
                key={index}
                onClick={() => onClickChatURLHandler({id: friend.uid, name: friend.name, profilePicUrl: friend.profilePicUrl})}
                className={activeFriends === friend.uid ? "cursor-pointer active" : "cursor-pointer"}
                >
                <Image 
                  className='user-profile-pic'
                  sizes='sm' 
                  src={friend.profilePicUrl === 'false' ? userIcon: friend.profilePicUrl }
                  />
                  <small className='ms-2'>{friend.name}</small>
                </ListGroup.Item>
              ))
            }
          </ListGroup>
          <h6 className='mt-5'>Groups</h6>
          <ListGroup>
            <span style={{color:'#a11b21'}}>No group available!</span>
          </ListGroup>
          </Col>
          <Col lg="8">
            {
              chatInfo.chat ? 
              <div className='chatbox-wrapper'>
                <div className='chat-header'>
                  <div className='friendInfo'>
                    <Image 
                    className='user-profile-pic'
                      sizes='sm' 
                      src={chatInfo.profilePicUrl === 'false' ? userIcon : chatInfo.profilePicUrl }
                    />
                    <b className='ms-2'>{chatInfo.userName}</b>
                  </div>
                </div>
                <div className='middle'>
                  {
                    messagePreLoader === true ? 
                    <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>
                      <Spinner animation="border" variant="secondary" size="sm"/>
                      <h6>loding...</h6>
                    </div>
                    :
                  <div className='chat-content-box'>
                    {
                      allMessage.map((message, index) => (
                        message.uid === userinfo.uid ?
                      
                        <div className='message-wrapper self' key={index}>
                          <div 
                          className='action-button' 
                          >
                            <IoMdRemoveCircleOutline 
                              onClick={() => messageDeleteClickHandler(message.key)}
                            />
                            
                          </div>
                          <div className='message-content'>
                          <p>{message.message}</p>
                          </div>
                          
                        </div>
                        :
                        <div className='message-wrapper' key={index}>
                          <div className='profile-pic'>
                          <Image src={userIcon}/>
                          </div>
                          <div className='message-content'>
                          <p>{message.message}</p>
                          <span style={{
                            fontSize:'10px',
                            color:'#414141'
                          }}>
                            {message.senderName}
                          </span>
                          </div>

                          <div className='action-button'>
                            <IoMdRemoveCircleOutline 
                              onClick={() => messageDeleteClickHandler(message.key)}
                            />
                          </div>
                        </div>
                    ))
                    
                  }
                  <div ref={messagesEndRef} />

                  </div>
                  }

                </div>
                <form className='chat-bottom'>
                  <MdPhoto 
                  fontSize={32} 
                  style={{color:'#1ea153',cursor:'pointer', marginRight:'10px'}}
                  onClick={sendImageFile}

                  />
                  <input type='file' id='file' ref={inputFile} style={{display: 'none'}}/>
                  <input 
                  className='form-control' 
                  type="text" 
                  placeholder="Write your message..." 
                  onChange={inputMessageChangeHandler}
                  value={inputMessage}
                  />
                  <Button 
                  type='submit' 
                  variant='success' 
                  size='sm'
                  onClick={(e)=>inputMessageClickHandler(e)}
                  className={buttonDisable ? "disabled" : ""}
                  >Send</Button>
                </form>
              </div> 
              :
              <div className='d-flex justify-content-center align-items-center'>
              <Image src={bgChatBox} />
            </div>
            }
          </Col>

          <Col lg={2}>
            <UsersList title="Might be your friends" />
          </Col>
        </Row>
      </Container>
  );
}

export default Dashboard;
