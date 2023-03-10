import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import classes from './ProfileForm.module.css';
import Verification from './Verification';

import ExpenseForm from './ExpenseForm';

const ProfileForm = () => {
  return (
    <Fragment>
    <div className={classes.parent}>
        
    <div className={classes.form}>
        Welcome to Expense Tracker!!!
    </div>
    <div className={classes.para}>
    Your Profile is incomplete
    <Link to ="/profileForm">  Complete it</Link>
    </div>
    
    
    </div>
    <div className={classes.Verification}>
    <Verification />
    </div>
    
    <ExpenseForm />
    </Fragment>
  )
}

export default ProfileForm