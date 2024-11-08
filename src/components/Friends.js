import React from 'react'

export default function Friends(props) {
  return (
    <div key={props.data.id} className='friendsContainer'>
        <div className='photo'>
            <img src={props.data.profilePicture} />
        </div>
        <p className='name'>{props.data.username}</p>
    </div>
  )
}
