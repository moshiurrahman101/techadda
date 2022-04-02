import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import defaultProfilePic from '../assets/images/user.png';
import {getDatabase, ref, onValue} from 'firebase/database';

function RequestList(props) {
    const [requests, setRequests] = useState([]);

    const inviteFriendsHandler = (id) =>{
        console.log(`Invite send to = ${id}`);
    }


    // const getData = async () =>{
    //     const db = getDatabase();
    //     const dataRef = ref(db, '/users/');
    //     onValue(dataRef, (snapshot) => {
    //       const propertyValues = Object.values(snapshot.val());
    //       setRequiests(propertyValues);
    //     });
    // }

    // useEffect(()=>{
    //     getData();
    // },[]);

  return (
    <div className='usersList'>
        <h4 className='userList-title mt-5'>{props.title}</h4>
        <div className='userListScroll'>

        {
            Array.isArray(requests) ?
            <span style={{color:'#a11b21'}}>No Request available!</span>
            :
            requests.map((request, index) => (
                <div className='users' key={index}>
                    <div className='profileDetails'>
                        <div className='image'>
                            <Image src={request.profilePicUrl === 'false' ? defaultProfilePic : request.profilePicUrl}/>
                        </div>
                        <div className='name'>
                            <span>{request.name}</span>
                        </div>
                    </div>
                    <div className='button'>
                        <button onClick={() => inviteFriendsHandler(request.uid)}>ADD</button>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default RequestList