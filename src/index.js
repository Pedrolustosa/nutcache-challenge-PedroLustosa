import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from "redux";
import { Provider } from "react-redux";
import { employeeReducer } from "./reducers/employeeReducer";

if (localStorage.getItem('employees') == null)
    localStorage.setItem('employees', JSON.stringify([]))

let initialState = {
  currentIndex : -1,
  list : JSON.parse(localStorage.getItem('employees'))
}
var store = createStore(employeeReducer, initialState)
ReactDOM.render(<Provider store={store}><App/></Provider>,
document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
