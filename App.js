// src/App.js
import React from 'react';
import './App.css';
import TodoList from './components/todoList';
import axios from 'axios';
axios.defaults.baseURL = 'https://todo-app-backend-2-adys.onrender.com'; //  backend URL

function App() {
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
