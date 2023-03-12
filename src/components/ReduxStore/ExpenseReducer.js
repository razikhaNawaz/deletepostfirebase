import { createSlice } from "@reduxjs/toolkit"


const initialState={
    expenses:[],
    isEditing: false,
    id:null,
    amount:null,
    description:null,
    category:null
}
const ExpenseReducer=createSlice({
    name:'expenses',
    initialState:initialState,
    reducers:{
        addExpense(state,actions){
            state.expenses=actions.payload
        },
        edit(state,actions){
            // state.isEditing=true,
            state.id=actions.payload.id, //id is captured here
            state.amount=actions.payload.amount,
            state.description=actions.payload.description,
            state.category=actions.payload.category
        },
        update(state){
            state.isEditing=false
        }
        

    }
})
export const ExpenseAction=ExpenseReducer.actions
export default ExpenseReducer.reducer