import React from 'react';
import classes from './ExpenseForm.module.css';

const ExpenseForm = () => {
  return (
    
    <div className={classes.parent}>
      <form className={classes.form}>
  <div class="mb-3">
    <label className="form-label">Amount</label>
    <input type="number" className="form-control" />
    
  </div>
  <div className="mb-3">
    <label  className="form-label">Description</label>
    <input type="text" className="form-control" />
  </div>
  <select className="form-select">
  <option selected>Choose Category</option>
  <option value="Food">Food</option>
  <option value="Rent">Rent</option>
  <option value="Shopping">Shopping</option>
</select>
  
  <button type="submit" className="btn btn-primary mt-5" >Submit</button>
</form>
    </div>
  )
}

export default ExpenseForm