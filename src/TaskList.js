// src/TaskList.js
import React from 'react';

const TaskList = ({ tasks, onDelete, onToggleCompletion }) => {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
          <span onClick={() => onToggleCompletion(task.id)}>{task.description}</span>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
