import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const TaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('tasks');
    if (data) {
      const found = JSON.parse(data).find(t => t.id === id);
      setTask(found);
    }
  }, [id]);

  const handleDelete = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updated = tasks.filter(t => t.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updated));
    navigate('/'); // Redirect back to homepage after delete
  };

  if (!task) return <p>Loading...</p>;

  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <div style={{ marginTop: '1rem' }}>
        <Link to={`/edit/${task.id}`} className="btn">Edit</Link>
        <Link to="/" className="btn">Back</Link>
        <button className="delete-btn" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default TaskDetail;

