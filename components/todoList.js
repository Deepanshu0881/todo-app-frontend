// src/components/TodoList.js
import React, { useState } from 'react';
import axios from 'axios';
import AddTodoForm from './addTodoForm';
import UpdateTodoForm from './updateTodoForm';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null); // State to track the todo being edited
  const [showTodos, setShowTodos] = useState(false); // State to track the visibility of the todo list

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos'); // Adjust according to your backend API routes
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleShowTodos = () => {
    fetchTodos();
    setShowTodos(true);
  };

  const handleUpdateTodo = async (updatedTodo) => {
    try {
      const response = await axios.put(`/api/todos/${updatedTodo._id}`, updatedTodo); // Adjust according to your backend API routes
      const updatedTodos = todos.map(todo =>
        todo._id === updatedTodo._id ? response.data : todo
      );
      setTodos(updatedTodos);
      setEditTodo(null); // Clear edit mode after update
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleEditClick = (todo) => {
    setEditTodo(todo);
  };

  const handleCancelEdit = () => {
    setEditTodo(null);
  };

  const handleDeleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`); // Adjust according to your backend API routes
      const filteredTodos = todos.filter(todo => todo._id !== id);
      setTodos(filteredTodos);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (todo) => {
    try {
      const updatedTodo = { ...todo, completed: !todo.completed };
      await axios.put(`/api/todos/${todo._id}`, updatedTodo); // Adjust according to your backend API routes
      const updatedTodos = todos.map(t =>
        t._id === todo._id ? { ...todo, completed: !todo.completed } : t
      );
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error toggling todo completion:', error);
    }
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <button onClick={handleShowTodos} className="show-todos-button">Show All Tasks</button>
      {showTodos && (
        <>
          <AddTodoForm onAdd={fetchTodos} />
          <ul>
            {todos.map(todo => (
              <li key={todo._id} className={todo.completed ? 'completed' : ''}>
                <div className="todo-item">
                  {editTodo && editTodo._id === todo._id ? (
                    <UpdateTodoForm todo={todo} onUpdate={handleUpdateTodo} onCancel={handleCancelEdit} />
                  ) : (
                    <>
                      <span className="todo-title">{todo.title}</span>
                      <div className="todo-actions">
                        <button onClick={() => handleEditClick(todo)}>Edit</button>
                        <button onClick={() => handleDeleteTodo(todo._id)}>Delete</button>
                        <button onClick={() => handleToggleComplete(todo)}>
                          {todo.completed ? ' Undo' : ' Done'}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default TodoList;
