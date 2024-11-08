import React from 'react'
import { Button } from '@mui/material'

export default function Register() {
  return (
    <div className='formWrapper'>
        <input placeholder='First Name' />
        <input placeholder='Last Name' />
        <input placeholder='Password' type='password'/>
        <input placeholder='Re-enter Password' type='password' />
        <Button variant='contained' size="large">Register</Button>
        <Button variant='contained' size="large" color="success">Login</Button>
    </div>
  )
}
