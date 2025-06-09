import React from 'react'
import RegisterUser from '../layouts/RegisterUser'

export default function Register() {
  return (
    <div className='loginWrapper'>
        <div className='loginbox'>
            <div className='col welcome'>
                <h1>Social</h1>
                <p>Connect with your friends and the worlds around you on Social.</p>
            </div>
            <div className='col'>
                <div className='form'>
                    <RegisterUser />
                </div>
            </div>
        </div>
    </div>
  )
}
