import React, { useEffect, useState } from 'react';
import { Image } from 'react-bootstrap';
import defaultProfilePic from '../assets/images/user.png';
import {getDatabase, ref, onValue} from 'firebase/database';

function UsersList(props) {
    const [users, setUsers] = useState([]);

    const inviteFriendsHandler = (id) =>{
        console.log(`Invite send to = ${id}`);
    }

    const getData = async () =>{
        const db = getDatabase();
        const dataRef = ref(db, '/users');
        onValue(dataRef, (snapshot) => {
          const propertyValues = Object.values(snapshot.val());
          setUsers(propertyValues);
        });
    }

    useEffect(()=>{
        getData();
    },[]);
    
    
  return (
    <div className='usersList'>
        <h4 className='userList-title'>{props.title}</h4>
        <div className='userListScroll'>

        {
            users.map((user, index) => (
                <div className='users' key={index}>
                    <div className='profileDetails'>
                        <div className='image'>
                            <Image src={user.profilePicUrl === 'false' ? defaultProfilePic : user.profilePicUrl}/>
                        </div>
                        <div className='name'>
                            <span>{user.name}</span>
                        </div>
                    </div>
                    <div className='button'>
                        <button onClick={() => inviteFriendsHandler(user.uid)}>ADD</button>
                    </div>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default UsersList