import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo.png';
import PostTask from './PostTask';
import { apiRequest } from '../utils/api';

const Home = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [showPostTask, setShowPostTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const data = await apiRequest('/api/tasks');
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate('/login');
  };

  const handlePostTask = async (taskData) => {
    try {
      if (editingTask) {
        const updated = await apiRequest(`/api/tasks/${taskData.id}`, {
          method: 'PUT',
          body: JSON.stringify(taskData)
        });
        setTasks(tasks.map(t => t.id === updated.id ? updated : t));
        setEditingTask(null);
      } else {
        const created = await apiRequest('/api/tasks', {
          method: 'POST',
          body: JSON.stringify(taskData)
        });
        setTasks([...tasks, created]);
      }
    } catch (error) {
      console.error('Failed to save task:', error);
      alert('Failed to save task. Please try again.');
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowPostTask(true);
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiRequest(`/api/tasks/${taskId}`, { method: 'DELETE' });
        setTasks(tasks.filter(t => t.id !== taskId));
      } catch (error) {
        console.error('Failed to delete task:', error);
        alert('Failed to delete task. Please try again.');
      }
    }
  };

  const handleCloseModal = () => {
    setShowPostTask(false);
    setEditingTask(null);
  };

  return (
    <div className="home-container">
      <nav className="home-nav">
        <div className="nav-logo">
          <img src={logo} alt="Podiweda" />
        </div>
        <div className="nav-right">
          <span className="nav-user">{user?.name?.split(' ')[0]}</span>
          <button onClick={handleSignOut} className="btn-signout" title="Logout">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16 17 21 12 16 7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </nav>

      <div className="home-content">
        <div className="card">
          <h2>Welcome to <span style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Podiweda.com</span></h2>
          <p className="card-subtitle">
            Post projects and hire talented freelancers
          </p>

          <div className="stats-grid">
            <div className="stat-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
              <h3>Active Tasks</h3>
              <p>{tasks.filter(t => t.status === 'open').length}</p>
            </div>

            <div className="stat-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
              <h3>Total Tasks</h3>
              <p>{tasks.length}</p>
            </div>

            <div className="stat-card" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
              <h3>Total Budget</h3>
              <p>${tasks.reduce((sum, t) => sum + Number(t.budget || 0), 0)}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '24px', color: '#1a202c', margin: 0 }}>My Tasks</h3>
            <button className="btn-action" onClick={() => setShowPostTask(true)}>+ Post New Task</button>
          </div>

          {loading ? (
            <div className="empty-state">
              <p>Loading tasks...</p>
            </div>
          ) : tasks.length === 0 ? (
            <div className="empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <line x1="9" y1="9" x2="15" y2="9"/>
                <line x1="9" y1="15" x2="15" y2="15"/>
              </svg>
              <p>No tasks posted yet. Click "Post New Task" to get started!</p>
            </div>
          ) : (
            <div>
              {tasks.map(task => (
                <div key={task.id} className="task-card">
                  <div className="task-header">
                    <div>
                      <h4 className="task-title">{task.title}</h4>
                      <div className="task-meta">
                        <span className="task-badge badge-category">{task.category}</span>
                        <span className="task-badge badge-location">📍 {task.location}</span>
                        <span className="task-badge badge-budget">${task.budget} {task.budgetType === 'hourly' ? '/hr' : ''}</span>
                        <span className="task-badge badge-status">{task.taskType}</span>
                      </div>
                    </div>
                  </div>
                  <p className="task-description">{task.description}</p>
                  <div style={{ fontSize: '13px', color: '#718096', marginBottom: '12px' }}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </div>
                  <div className="task-actions">
                    <button className="btn-edit" onClick={() => handleEditTask(task)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showPostTask && (
        <PostTask
          onClose={handleCloseModal}
          onSubmit={handlePostTask}
          editTask={editingTask}
        />
      )}
    </div>
  );
};

export default Home;
