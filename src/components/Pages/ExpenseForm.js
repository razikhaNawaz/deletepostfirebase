import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExpenseContext from '../Store/ExpenseContext';
import classes from './ExpenseForm.module.css';

const ExpenseForm = () => {
  // const expenseCntx=useContext(ExpenseContext)
  const dispatch=useDispatch()
  const isEditing=useSelector((state)=>state.expenseReducer.isEditing)
  const idForEditing=useSelector((state)=>state.expenseReducer.id)
  const amountForEditing=useSelector((state)=>state.expenseReducer.amount)
  const descriptionForEditing=useSelector((state)=>state.expenseReducer.description)
  const categoryForEditing=useSelector((state)=>state.expenseReducer.category)

  const [amount, setAmount]=useState('')
  const [description, setDescription]= useState('')
  const [category, setCategory]=useState('food')
const amountHandler=(e)=>{
  setAmount(e.target.value)
}

const descriptionHandler=(e)=>{
  setDescription(e.target.value)
}

const categoryHandler=(e)=>{
  setCategory(e.target.value)
}

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
        // setExpense(arrayOfData)
        dispatch(ExpenseAction.addExpense(arrayOfData))
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

const putData=async(obj)=>{
  try {
      const response=await fetch(`${url}/${email}/${idForEditing}.json`,{
          method:'PUT',
          body:JSON.stringify(obj),
          headers:{
              'Content-Type':'application/json'
          }
      })
      console.log(response);
      getData()
      
  } catch (error) {
      console.log(error);
  }
}


const submitHandler=(e)=>{
e.preventDefault();

const obj={
  amount:amount,
  description:description,
  category:category
}
if(isEditing){
  // expenseCntx.update(expenseCntx.id,obj)
  putData(obj)
  dispatch(ExpenseAction.update())
}else{
postData()
}
}

useEffect(()=>{
if(isEditing){
  setAmount(amountForEditing)
  setDescription(descriptionForEditing)
  setCategory(categoryForEditing)
}else{
  setAmount("")
  setDescription("")
  setCategory("")
}
},[isEditing])

  return (
    
    <div className={classes.parent}>
      <form className={classes.form} onSubmit={submitHandler}>
  <div class="mb-3">
    <label className="form-label">Amount</label>
    <input type="number" className="form-control" value={amount} onChange={amountHandler}/>
    
  </div>
  <div className="mb-3">
    <label  className="form-label">Description</label>
    <input type="text" className="form-control" value={description} onChange={descriptionHandler}/>
  </div>
  <label  className="form-label">Category</label>
  <select className="form-select" value={category} onChange={categoryHandler}>
  
  <option selected>Food</option>
  <option value="Rent">Rent</option>
  <option value="Shopping">Shopping</option>
</select>
  
  <button type="submit" className="btn btn-primary mt-5" >{isEditing ?'Update' : 'Save'}</button>
</form>
    </div>
  )
}

export default ExpenseForm