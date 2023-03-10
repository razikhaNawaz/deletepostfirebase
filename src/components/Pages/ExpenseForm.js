import React, { useContext, useState } from 'react';
import ExpenseContext from '../Store/ExpenseContext';
import classes from './ExpenseForm.module.css';

const ExpenseForm = () => {
  const expenseCntx=useContext(ExpenseContext)

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

const submitHandler=(e)=>{
e.preventDefault();
const obj={
  amount:amount,
  description:description,
  category:category
}
expenseCntx.addExpense(obj)
}

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
  
  <button type="submit" className="btn btn-primary mt-5" >Submit</button>
</form>
    </div>
  )
}

export default ExpenseForm