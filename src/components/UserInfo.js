import React,{useEffect,useState} from 'react'
import Friends from './Friends'
import axios from 'axios';
export default function UserInfo(props) {
  const {user} = props;
  const [followings,setFollowings] = useState([]);

  const fecthFollowings = async ()=>{
    try {
      let followings = [];
    await Promise.all(
      user && user.followings.map(async (userId)=>{
        let res = await axios.get(`users?userId=${userId}`)
        followings.push(res.data.user);
      })
    )
    setFollowings(followings);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    fecthFollowings();
  },[])

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
            return <Friends data={user} />
          })}
        </div>
      </div>
    </div>
  )
}
