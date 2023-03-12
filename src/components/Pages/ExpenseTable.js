import React, { useContext } from 'react'
import { useDispatch } from 'react-redux'
import ExpenseContext from '../Store/ExpenseContext'

const ExpenseTable = () => {
    // const expenseCntxt=useContext(ExpenseContext)
    const dispatch=useDispatch()
    const arrayOfData=useSelector((state)=>state.expenseReducer.expenses)


    const editHandler=(id, amount, description, category)=>{
        // expenseCntxt.edit(id, amount, description, category)
        dispatch(ExpenseAction.edit(id, amount, description, category))
    }

    const deleteData=async(id)=>{
      try{
          const response=await fetch(`${url}/${email}/${id}.json`,{
              method:'DELETE'
          })
          getData()
          console.log(response)
      }
      catch(err){
          console.log(err);
      }
  }

    const deleteHandler=(id)=>{

      deleteData(id)
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
    </div>
  )
}

export default ExpenseTable