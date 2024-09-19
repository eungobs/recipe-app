import React, { useState, useRef } from 'react';

export default function AddRecipe() {
  const [tasks, setTasks] = useState([]);
  const [opened, setOpened] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const taskTitle = useRef(null);
  const taskSummary = useRef(null);

  function createTask() {
    setTasks([
      ...tasks,
      {
        title: taskTitle.current.value,
        summary: taskSummary.current.value,
      },
    ]);
    setOpened(false);
  }

  function deleteTask(index) {
    const clonedTasks = [...tasks];
    clonedTasks.splice(index, 1);
    setTasks(clonedTasks);
  }

  return (
    <div className="App" style={{ backgroundColor: darkMode ? '#333' : '#fff', color: darkMode ? '#fff' : '#000', minHeight: '100vh' }}>
      <div style={{ padding: '20px' }}>
        {opened && (
          <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -50%)', background: '#fff', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
            <h2>New Task</h2>
            <div style={{ marginBottom: '10px' }}>
              <input
                type="text"
                placeholder="Task Title"
                ref={taskTitle}
                style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
              />
              <input
                type="text"
                placeholder="Task Summary"
                ref={taskSummary}
                style={{ width: '100%', padding: '8px' }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setOpened(false)} style={{ padding: '10px', background: '#f0f0f0', border: 'none', borderRadius: '4px' }}>Cancel</button>
              <button onClick={createTask} style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>Create Task</button>
            </div>
          </div>
        )}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <h1>My Tasks</h1>
          <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <div key={index} style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '10px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong>{task.title}</strong>
                <button onClick={() => deleteTask(index)} style={{ background: 'transparent', border: 'none', color: 'red' }}>Delete</button>
              </div>
              <p>{task.summary || 'No summary was provided for this task'}</p>
            </div>
          ))
        ) : (
          <p>You have no tasks</p>
        )}
        <button onClick={() => setOpened(true)} style={{ width: '100%', padding: '10px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px' }}>
          New Task
        </button>
      </div>
    </div>
  );
}

