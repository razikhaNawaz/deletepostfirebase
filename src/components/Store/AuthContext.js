import React, { useState } from 'react';

const AuthContext=React.createContext();


export const AuthProvider=(props)=>{
    const [login, setLogin] =useState(true);
    const initialEmail=!!localStorage.getItem('email')
    const [Authenticate, setIsAuthenticate]=useState(initialEmail)
let url;
const Auth=async(userEmail, userPassword)=>{

if(login){
     url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyByRYI7AGI18SmodbMmvKKyfqdblqRnORc'
}else{
     url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyByRYI7AGI18SmodbMmvKKyfqdblqRnORc'
}

try{
const response=await fetch(url,{
    method:'POST',
    body:JSON.stringify({
        email:userEmail,
        password:userPassword,
        returnSecureToken:true
    }),
    headers:{
        'Content-Type':'application/json'
    }
})
const data=await response.json()
console.log(data)
localStorage.setItem('token', data.idToken)
setIsAuthenticate(true)
localStorage.setItem('email', userEmail)
}
catch(err){
console.log(err);
}
}


const switchAuthHandler=()=>{
    setLogin((prev)=>!prev)
}

    const values={
        switchAuth:switchAuthHandler,
        isLogin:login,
        authFunction:Auth,
        isAuthenticate:Authenticate
    }
    return (
        <AuthContext.Provider value={values} >
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContext;