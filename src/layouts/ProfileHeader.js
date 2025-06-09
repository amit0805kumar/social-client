import React from 'react'

export default function ProfileHeader(props) {
  const {user} = props;
  return (
    <div className='profileHeader'>
      <div className='bg-img'>
       <img src={user.coverPicture}/> 
      </div>
        <div className='content'>
            <div className='dp'>
                <img src={user.profilePicture} />
            </div>
            <h2>{user.username}</h2>
        </div>
    </div>
  )
}
