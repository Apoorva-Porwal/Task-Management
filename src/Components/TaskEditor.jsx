import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const TaskEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (id) {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      const task = tasks.find(t => t.id === id);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
      }
    }
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!description.trim()) {
    setError('Description is required');
    return;
  }
    
    const newTask = { id: id || Date.now().toString(), title, description };
    const existing = JSON.parse(localStorage.getItem('tasks')) || [];
    const updated = id
      ? existing.map(t => (t.id === id ? newTask : t))
      : [...existing, newTask];

    localStorage.setItem('tasks', JSON.stringify(updated));
    navigate('/');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
      {error && <p className="error">{error}</p>}
      <label>Title:
        <input value={title} onChange={e => setTitle(e.target.value)} />
      </label>
      <label>Description:
        <textarea value={description} onChange={e => setDescription(e.target.value)} />
      </label>
      <button className="btn">Save</button>
    </form>
  );
};

export default TaskEditor;

