import React from 'react'
import { Button } from '@mui/material'
import {Link} from 'react-router-dom'

export default function RegisterUser() {
  return (
    <div className='formWrapper'>
        <input placeholder='First Name' />
        <input placeholder='Last Name' />
        <input placeholder='Password' type='password'/>
        <input placeholder='Re-enter Password' type='password' />
        <Button variant='contained' size="large">Register</Button>
        <Link to="/login"><Button variant='contained' size="large" color="success">Login</Button></Link>
    </div>
  )
}
