import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import { AuthProvider } from './components/Store/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { ExpenseContextProvider } from './components/Store/ExpenseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
<AuthProvider><ExpenseContextProvider><App /></ExpenseContextProvider></AuthProvider>
</BrowserRouter>);
