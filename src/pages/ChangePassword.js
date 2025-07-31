

import React from 'react'
import ChangePasswordForm from '../layouts/ChangePasswordForm';

export default function ChangePassword() {
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
                       <ChangePasswordForm />
                   </div>
               </div>
           </div>
       </div>
      </React.Fragment>
  );
}