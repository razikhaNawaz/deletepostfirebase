import React, { useEffect, useState } from "react";

const ExpenseContext=React.createContext();

export const ExpenseContextProvider=(props)=>{
const [expense, setExpense]=useState([])

const email=localStorage.getItem('email').replace(/[@,.]/g,'')
let url='https://react-expense-a0c95-default-rtdb.firebaseio.com'
const getData=async()=>{
    try{
        const response=await fetch(`${url}/${email}.json`);
        const data=await response.json()
        let arrayOfData=[];
        for(let key in data){
            arrayOfData.push({id:key, ...data[key]})
        }
        setExpense(arrayOfData)
        console.log(arrayOfData);
    }
    catch(err){
        console.log(err);
    }
}

const postData=async(obj)=>{
    try{
        const response=await fetch(`${url}/${email}.json`,{
            method:'POST',
            body:JSON.stringify(obj),
            headers:{
                'Content-Type':'application/json'
            }
        })

       const data=await response.json()
       console.log(data)
       getData()
    }
    

    catch(err){
        console.log(err);
    }
}

const addExpenseHandler=(newExpense)=>{
postData(newExpense)
console.log('add expense called')
}

useEffect(()=>{
    getData()
},[])

    const values={
        expenses:expense,
        addExpense:addExpenseHandler

    }
    return (
        <ExpenseContext.Provider value={values}>{props.children}</ExpenseContext.Provider>
    )
}
export default ExpenseContext;