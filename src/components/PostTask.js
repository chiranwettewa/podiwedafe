import React, { useState } from 'react';
import '../styles/PostTask.css';

const PostTask = ({ onClose, onSubmit, editTask = null }) => {
  const [formData, setFormData] = useState(editTask || {
    title: '',
    description: '',
    category: 'cleaning',
    location: '',
    taskType: 'in-person',
    budget: '',
    budgetType: 'fixed',
    dueDate: '',
    status: 'open'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = { ...formData };
    if (editTask) {
      taskData.id = editTask.id;
    }
    onSubmit(taskData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{editTask ? 'Edit Task' : 'Post a New Task'}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>Task Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Help me move furniture"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe what you need done..."
              rows="4"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Category *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="cleaning">Cleaning</option>
                <option value="handyman">Handyman</option>
                <option value="delivery">Delivery</option>
                <option value="gardening">Gardening</option>
                <option value="moving">Moving</option>
                <option value="assembly">Assembly</option>
                <option value="photography">Photography</option>
                <option value="writing">Writing</option>
                <option value="design">Design</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Task Type *</label>
              <select name="taskType" value={formData.taskType} onChange={handleChange}>
                <option value="in-person">In Person</option>
                <option value="remote">Remote</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Location *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Sydney NSW 2000"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Budget Type *</label>
              <select name="budgetType" value={formData.budgetType} onChange={handleChange}>
                <option value="fixed">Fixed Price</option>
                <option value="hourly">Hourly Rate</option>
              </select>
            </div>

            <div className="form-group">
              <label>Budget (${formData.budgetType === 'hourly' ? '/hr' : ''}) *</label>
              <input
                type="number"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                placeholder="0"
                min="0"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Due Date *</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              required
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {editTask ? 'Update Task' : 'Post Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostTask;
