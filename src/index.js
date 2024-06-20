import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
//import { AuthProvider } from './components/Store/AuthContext';
import { BrowserRouter } from 'react-router-dom';
//import { ExpenseContextProvider } from './components/Store/ExpenseContext';
import { Provider } from 'react-redux';
import store from './components/ReduxStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
{/* <AuthProvider><ExpenseContextProvider> */}
    <Provider store={store}>
    <App />
    </Provider>
    {/* </ExpenseContextProvider></AuthProvider> */}
</BrowserRouter>);
