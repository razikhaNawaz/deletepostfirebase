import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ExpenseAction } from '../ReduxStore/ExpenseReducer';
import { ThemeReducerAction } from '../ReduxStore/ThemeReducer';
// import ExpenseContext from '../Store/ExpenseContext';
import classes from './ExpenseForm.module.css';

const ExpenseForm = () => {
  // const expenseCntx=useContext(ExpenseContext)
  const dispatch=useDispatch()
  const isEditing=useSelector((state)=>state.expenseReducer.isEditing)
  const idForEditing=useSelector((state)=>state.expenseReducer.id)
  const amountForEditing=useSelector((state)=>state.expenseReducer.amount)
  const descriptionForEditing=useSelector((state)=>state.expenseReducer.description)
  const categoryForEditing=useSelector((state)=>state.expenseReducer.category)
  const deleted=useSelector((state)=>state.expenseReducer.deleted)
  const arrayOfData=useSelector((state)=>state.expenseReducer.expenses)

  const [amount, setAmount]=useState('')
  const [description, setDescription]= useState('')
  const [category, setCategory]=useState('food')
  const [show, setShow]=useState(false)
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
let url='https://react-http-15873-default-rtdb.firebaseio.com'
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
postData(obj)
}
}

let total=0;
arrayOfData.forEach((exp)=>{
  total+=Number(exp.amount)
})

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

const showHandler=()=>{
setShow(!show)
}

const themeChangeHandler=()=>{
  dispatch(ThemeReducerAction.ModeChange())
}

const heading=['Expense', 'Category','Description']
const ExpToDwnld=[heading]
arrayOfData.forEach((exp)=>{
  ExpToDwnld.push([exp.amount, exp.category,exp.description])
})
const ExpToDwnld2=ExpToDwnld.map((expense)=>{
  return expense.join(',')
}).join('\n')
const blob=new Blob([ExpToDwnld2])
const urlToDwnld=URL.createObjectURL(blob)

useEffect(()=>{
  getData()
},[deleted])


  return (
    
    
    <div className={classes.parent}>
      <div className={classes.add}>
      {total>=10000 && <button type="button" className="btn btn-primary mt-5 mb-5 me-5">
       <a href={urlToDwnld} download="expense.csv" style={{color:'white',textDecoration:'none'}}> Download Expenses</a>
       
        </button>}
      {total>=10000 && <button type="button" className="btn btn-primary mt-5 mb-5 me-5" onClick={themeChangeHandler}>Change Theme</button>}
      {total>=10000 && <button type="button" className="btn btn-primary mt-5 mb-5 me-5">Premium</button>}
      <button type="button" className="btn btn-primary mt-5 mb-5" onClick={showHandler}>{show ? 'close' : '+Add Expense'}</button>
      </div>
      {show && <form className={classes.form} onSubmit={submitHandler}>
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
</form>}
    </div>
 
  )
}

export default ExpenseForm