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
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle) {
      setError('Title is required');
      return;
    }
    if (!trimmedDescription) {
      setError('Description is required');
      return;
    }

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    const isDuplicate = tasks.some(t =>
      t.id !== id && t.title.trim().toLowerCase() === trimmedTitle.toLowerCase()
    );

    if (isDuplicate) {
      setError('A task with this title already exists.');
      return;
    }

    const newTask = {
      id: id || Date.now().toString(),
      title: trimmedTitle,
      description: trimmedDescription
    };

    const updatedTasks = id
      ? tasks.map(t => (t.id === id ? newTask : t))
      : [...tasks, newTask];

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    navigate('/');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{id ? 'Edit Task' : 'Create Task'}</h2>
      {error && <p className="error">{error}</p>}
      <label>
        Title:
        <input
          value={title}
          onChange={e => {
            setTitle(e.target.value);
            setError('');
          }}
        />
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={e => {
            setDescription(e.target.value);
            setError('');
          }}
        />
      </label>
      <button className="btn">Save</button>
    </form>
  );
};

export default TaskEditor;


