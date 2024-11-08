import React from 'react'
import Register from '../components/Register'
import LoginUser from '../components/LoginUser'

export default function Login() {
  return (
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
  )
}
