// src/components/UpdateTodoForm.js
import React, { useState } from 'react';

const UpdateTodoForm = ({ todo, onUpdate, onCancel }) => {
  const [title, setTitle] = useState(todo.title);

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...todo, title });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Update todo"
        required
      />
      <button type="submit">Save</button>
      <button type="button" onClick={onCancel}>Cancel</button>
    </form>
  );
};

export default UpdateTodoForm;
