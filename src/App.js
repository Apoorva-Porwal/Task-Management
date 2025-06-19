// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './Components/TaskList';
import TaskDetail from './Components/TaskDetail';
import TaskEditor from './Components/TaskEditor';

function App() {
  return (
    <Router>
      <div className="app">
        <h1>Task Management</h1>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/task/:id" element={<TaskDetail />} />
          <Route path="/edit/:id" element={<TaskEditor />} />
          <Route path="/create" element={<TaskEditor />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

