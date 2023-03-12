import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import ExpenseReducer from "./ExpenseReducer";


const store=configureStore({
    reducer:{
        authReducer:AuthReducer,
        expenseReducer:ExpenseReducer
    }
})
export default store;