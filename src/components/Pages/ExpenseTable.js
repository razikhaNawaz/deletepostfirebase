import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authAction } from '../ReduxStore/AuthReducer'
import { ExpenseAction } from '../ReduxStore/ExpenseReducer'
// import ExpenseContext from '../Store/ExpenseContext'

const ExpenseTable = () => {
    // const expenseCntxt=useContext(ExpenseContext)
    const dispatch=useDispatch()
    const arrayOfData=useSelector((state)=>state.expenseReducer.expenses)
    


    const editHandler=(id, amount, description, category)=>{
        // expenseCntxt.edit(id, amount, description, category)
        let obj={
          id:id,
          amount:amount,
          description:description,
          category:category
        }
        dispatch(ExpenseAction.edit(obj)) //in redux we cant pass more than one argument, to pass more than one argument we have to store in object and den pass
    }
    const email=localStorage.getItem('email').replace(/[@,.]/g,'')
    let url='https://react-http-15873-default-rtdb.firebaseio.com'
    const deleteExpense=async(id)=>{
      try{
          const response=await fetch(`${url}/${email}/${id}.json`,{
              method:'DELETE'
          })
          
          console.log(response)
          dispatch(ExpenseAction.deleteData())
      }
      catch(err){
          console.log(err);
      }
  }

    const deleteHandler=(id)=>{

      deleteExpense(id)
    }

    let totalAmount=0;
   arrayOfData.forEach((expense)=>{
    totalAmount+=Number(expense.amount)
   })
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
    {arrayOfData.map((expense,index)=>{
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
            <button type="button" class="btn btn-danger" onClick={deleteHandler.bind(null,expense.id)}>Delete</button>
            </td>
      
          </tr>
        )
    })}
   
    
  </tbody>
</table>
<div style={{display:'flex',justifyContent:'space-between', marginRight:'200px'}}>
  <div>Total expenses</div>
  <div>${totalAmount}</div>
</div>
    </div>
  )
}

export default ExpenseTable