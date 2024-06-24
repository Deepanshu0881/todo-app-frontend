// src/components/AddTodoForm.js
import React, { useState } from 'react';
import axios from 'axios';

const AddTodoForm = ({ onAdd }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/todos', { title }); // Ensure this matches your backend route
      onAdd(); // Refresh the list
      setTitle(''); // Clear input field
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new todo"
        required
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
