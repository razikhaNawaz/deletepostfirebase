import React from 'react';
import { Link } from 'react-router-dom';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  return (
    <div className={classes.parent}>
        
    <div className={classes.form}>
        Welcome to Expense Tracker!!!
    </div>
    <div className={classes.para}>
    Your Profile is incomplete
    <Link to ="/profileForm">  Complete it</Link>
    </div>
    
    </div>
  )
}

export default ProfileForm