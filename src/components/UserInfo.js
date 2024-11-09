import React,{useEffect,useState} from 'react'
import Friends from './Friends'
import { callApi } from '../helpers/Helpers';

export default function UserInfo(props) {

  const {followings} = props;
  return (
    <div className='userInfoWrapper'>
      <div className='basic'>
        <h3>User Information</h3>
        <div className='row'>
          <h4>City</h4> <p>Ghaziabad</p>
        </div>
        <div className='row'>
          <h4>From</h4> <p>Up</p>
        </div>
        <div className='row'>
          <h4>Relationship</h4> <p>Single</p>
        </div>
      </div>
      <div className='friends'>
        <h3>User friends</h3>
        <div className='friends_list'>
          {followings && followings.map(user=>{
            return <Friends key={user._id} data={user} />
          })}
        </div>
      </div>
    </div>
  )
}
