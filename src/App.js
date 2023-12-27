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
    setTasks(tasks.map((task) => (task.id === taskId ? { ...task, completed: !task.completed } : task)));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  return (
    <div>
      <h1>LocalTasker</h1>
      <div>
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Enter task description"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <TaskList tasks={tasks} onDelete={deleteTask} onToggleCompletion={toggleTaskCompletion} />
      <button onClick={clearCompletedTasks}>Clear Completed</button>
    </div>
  );
};

export default App;
