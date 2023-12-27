// src/App.js
import React, { useState } from 'react';
import TaskList from './TaskList';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), description: taskInput, completed: false }]);
      setTaskInput('');
    }
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const toggleTaskCompletion = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task))
    );
  };

  const clearCompletedTasks = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  return (
    <div style={{ boxShadow: '0 0 5px black', padding: '20px 80px' }}>
      <div>
        <h1>Grocery Bud</h1>
        <div>
          <input
            type="text"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            placeholder="Enter task description"
          />
          <button className="add-item" onClick={addTask}>
            Add Item
          </button>
        </div>
        <TaskList tasks={tasks} onDelete={deleteTask} onToggleCompletion={toggleTaskCompletion} />
        <button className="delete-item" onClick={clearCompletedTasks}>
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default App;
