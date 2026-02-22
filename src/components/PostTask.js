import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/PostTask.css';
import { getDistricts, getCities } from '../utils/locationData';

const PostTask = ({ onClose, onSubmit, editTask = null }) => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState(editTask || {
    title: '',
    description: '',
    category: 'cleaning',
    district: '',
    city: '',
    address: '',
    taskType: 'in-person',
    budget: '',
    budgetType: 'fixed',
    dueDate: '',
    phoneNumber: '',
    status: 'open'
  });

  const [availableCities, setAvailableCities] = useState([]);

  useEffect(() => {
    if (editTask && editTask.district) {
      setAvailableCities(getCities(language, editTask.district));
    }
  }, [editTask, language]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === 'district') {
      setAvailableCities(getCities(language, value));
      setFormData({ ...formData, district: value, city: '' });
    }
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
          <h2>{editTask ? t('task.editTask') : t('task.postTask')}</h2>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label>{t('task.title')} *</label>
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
            <label>{t('task.description')} *</label>
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
              <label>{t('task.category')} *</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="cleaning">{t('categories.cleaning')}</option>
                <option value="handyman">{t('categories.handyman')}</option>
                <option value="delivery">{t('categories.delivery')}</option>
                <option value="gardening">{t('categories.gardening')}</option>
                <option value="moving">{t('categories.moving')}</option>
                <option value="assembly">{t('categories.assembly')}</option>
                <option value="photography">{t('categories.photography')}</option>
                <option value="writing">{t('categories.writing')}</option>
                <option value="design">{t('categories.design')}</option>
                <option value="elderly-care">{t('categories.elderlyCare')}</option>
                <option value="other">{t('categories.other')}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('task.taskType')} *</label>
              <select name="taskType" value={formData.taskType} onChange={handleChange}>
                <option value="in-person">{t('taskTypes.inPerson')}</option>
                <option value="remote">{t('taskTypes.remote')}</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t('task.district')} *</label>
              <select name="district" value={formData.district} onChange={handleChange} required>
                <option value="">Select District</option>
                {getDistricts(language).map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>{t('task.city')} *</label>
              <select name="city" value={formData.city} onChange={handleChange} required disabled={!formData.district}>
                <option value="">Select City</option>
                {availableCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>{t('task.address')} *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g., 123 Main Street"
              required
            />
          </div>

          <div className="form-group">
            <label>{t('task.phoneNumber')} *</label>
            <input
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="e.g., +1 234 567 8900"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>{t('task.budgetType')} *</label>
              <select name="budgetType" value={formData.budgetType} onChange={handleChange}>
                <option value="fixed">{t('budgetTypes.fixed')}</option>
                <option value="hourly">{t('budgetTypes.hourly')}</option>
              </select>
            </div>

            <div className="form-group">
              <label>{t('task.budget')} (${formData.budgetType === 'hourly' ? '/hr' : ''}) *</label>
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
            <label>{t('task.dueDate')} *</label>
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
              {t('task.cancel')}
            </button>
            <button type="submit" className="btn-submit">
              {editTask ? t('task.updateTask') : t('task.postTask')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostTask;
