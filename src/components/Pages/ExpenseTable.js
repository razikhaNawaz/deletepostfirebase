import React, { useContext } from 'react'
import ExpenseContext from '../Store/ExpenseContext'

const ExpenseTable = () => {
    const expenseCntxt=useContext(ExpenseContext)


    const editHandler=(id, amount, description, category)=>{
        expenseCntxt.edit(id, amount, description, category)
        
    }
  return (
    <div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Amount</th>
      
      <th scope="col">Description</th>
      <th scope="col">Category</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {expenseCntxt.expenses.map((expense,index)=>{
        return (
            <tr key={expense.id}>
            <th scope="row">{index+1}</th>
            <td>{expense.amount}</td>
            <td>{expense.description}</td>
            <td>{expense.category}</td>
            <td>
            <button type="button" class="btn btn-primary" onClick={editHandler.bind(null, expense.id,expense.amount,expense.description,expense.category)}>Edit</button>
            </td>
            <td>
            <button type="button" class="btn btn-danger">Delete</button>
            </td>
      
          </tr>
        )
    })}
   
    
  </tbody>
</table>
    </div>
  )
}

export default ExpenseTable