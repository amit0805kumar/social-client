import React from 'react'
import LoginUser from '../layouts/LoginUser'

export default function Login() {
  return (
   <React.Fragment>
     <div className='loginWrapper'>
        <div className='loginbox'>
            <div className='col welcome'>
                <h1>Social</h1>
                <p>Connect with your friends and the worlds around you on Social.</p>
            </div>
            <div className='col'>
                <div className='form'>
                    <LoginUser />
                </div>
            </div>
        </div>
    </div>
   </React.Fragment>
  )
}
