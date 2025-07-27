import { Avatar } from '@mui/material'
export default function Friends(props) {
  return (
    <div key={props.data.id} className='friendsContainer'>
        <div className='photo'>
            <Avatar src={props.data.profilePicture} sx={{ width: 100, height: 100 }} />
        </div>
        <p className='name'>{props.data.username}</p>
    </div>
  )
}

 