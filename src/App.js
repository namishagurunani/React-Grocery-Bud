import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import './App.css';

const App = () => {
  // Load tasks from local storage on component mount
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');

  const addTask = () => {
    if (taskInput.trim() !== '') {
      const newTask = { id: Date.now(), description: taskInput, completed: false };
      setTasks([...tasks, newTask]);
      setTaskInput('');
      updateLocalStorage([...tasks, newTask]);
    }
  };

  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const clearCompletedTasks = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
    updateLocalStorage(updatedTasks);
  };

  const updateLocalStorage = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
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
