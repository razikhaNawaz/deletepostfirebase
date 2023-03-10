import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './ProfileComplete.module.css';

const ProfileComplete = () => {
    const [name, setName]= useState('')
    const [url, setUrl]= useState('');
const token=localStorage.getItem('token')
    const nameHandler=(e)=>{
        setName(e.target.value)
    }

    const urlHandler=(e)=>{
        setUrl(e.target.value)
    }
    let Url='https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyByRYI7AGI18SmodbMmvKKyfqdblqRnORc'

    const getData=async()=>{
        try{
            const response=await fetch(`${Url}`, {
                method:'POST',
                body:JSON.stringify({
                    idToken:token
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            const data=await response.json()
            console.log(data, 'data')
            setName(data.displayName) //to set data from resonse(backend) in input field
            setUrl(data.photoUrl)
        }catch(err){
            console.log(err);
        }
    }


    const postData=async()=>{
        try{
            const response=await fetch(Url,{
                method:'POST',
                body:JSON.stringify({
                    idToken:token,
                    displayName:name,
                    photoUrl:url,
                    // deleteAttribute: "NULL",
                    returnSecureToken:false
                }),
                headers:{
                    "Content-Type": 'application/json'
                }
            })
            console.log(response, 'response')
            getData()
        }catch(err){
            console.log(err);
        }
    }

    

    const updateHandler=(e)=>{
        e.preventDefault()
        postData();
    }

    useEffect(()=>{
        getData();
    },[])

  return (
    <Fragment>
        <div className={classes.parent}>
            <div className={classes.left}>Winners never Quit, Quitters never win</div>
            <div className={classes.right}>Your Profie is 64% completed. A complete profile has higher chances of landing a job
            <Link>  Complete Now</Link>
            </div>
        </div>
        <div className={classes.line}></div>
        <div className={classes.container}>
            <div className={classes.child1}>
                <div className={classes.child1left}>
                    Contact details
                </div>
                <div className={classes.child1right}>
                    <button>Cancel</button>
                </div>

            </div>
            <div className={classes.child2}>
                <div className={classes.child2left}>
                    <img src="https://1000logos.net/wp-content/uploads/2018/08/GitHub-cat-logo.jpg" alt=""></img>
                <label>Full Name:</label>
                <input type="text" value={name} onChange={nameHandler}></input>
                </div>
                <div className={classes.child2right}>
                <img src="https://cdn.pixabay.com/photo/2013/07/12/13/43/earth-147171_1280.png" alt=""></img>
                <label>Profile Photo URL:</label>
                <input type="text" value={url} onChange={urlHandler}></input> 
                </div>
                
            </div>
            <div className={classes.child3}>
                <button onClick={updateHandler}>Update</button>
            </div><div className={classes.line}></div>
            
        </div>
    </Fragment>
  )
}

export default ProfileComplete