import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  const handleDelete = (id) => {
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="task-list">
      <div className='task-heading'>
      <h5 className="list">Task List</h5>
      <Link to="/create" className="btn">Add Task</Link>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className='task-item'>
            <strong className='task-title'>{task.title}</strong>
            <div>
              {/* <Link to={`/task/${task.id}`} className="btn">View</Link> */}
              <Link to={`/edit/${task.id}`} className="btn">Edit</Link>
              <button className="delete-btn" onClick={() => handleDelete(task.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;

