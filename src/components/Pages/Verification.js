import React, { useContext } from 'react'
import AuthContext from '../Store/AuthContext'

const Verification = () => {

    const Cntxt=useContext(AuthContext);
    const token=localStorage.getItem('token')
let url='https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyByRYI7AGI18SmodbMmvKKyfqdblqRnORc'
    const verifyEmail=async()=>{
        try{
            const response=await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    requestType:'VERIFY_EMAIL',
                    idToken:token
                })
            })
            console.log(response)
            alert('check your inbox')

        }
        catch(err){
            console.log(err);
        }
    }

    const logoutHandler=()=>{
        Cntxt.logout()
    }
  return (
    <div>
    <button onClick={verifyEmail} className="btn btn-warning">
        Verify Useremail
    </button>
    <button onClick={logoutHandler} className="btn btn-danger">
        Logout
    </button>
    </div>
  )
}

export default Verification