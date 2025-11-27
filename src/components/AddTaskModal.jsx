import React, { useState } from 'react';
import '../styles/AddTaskModal.css';

const AddTaskModal = ({ employees, onAddTask, onClose }) => {
  const [formData, setFormData] = useState({
    employeeId: employees[0]?.id || '',
    title: '',
    status: 'Pending',
    priority: 'Medium',
    dueDate: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Required';
    if (!formData.employeeId) newErrors.employeeId = 'Required';
    if (!formData.dueDate) newErrors.dueDate = 'Required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddTask({
      employeeId: parseInt(formData.employeeId),
      task: {
        id: Date.now(),
        title: formData.title,
        status: formData.status,
        priority: formData.priority,
        dueDate: formData.dueDate
      }
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>➕ Add New Task</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>
        <form className="task-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>👤 Employee *</label>
            <select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              className={errors.employeeId ? 'error' : ''}
            >
              <option value="">Choose...</option>
              {employees.map(emp => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </select>
            {errors.employeeId && <span className="error-msg">{errors.employeeId}</span>}
          </div>
          <div className="form-group">
            <label>📝 Task Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title"
              className={errors.title ? 'error' : ''}
            />
            {errors.title && <span className="error-msg">{errors.title}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>📊 Status</label>
              <select name="status" value={formData.status} onChange={handleChange}>
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>🎯 Priority</label>
              <select name="priority" value={formData.priority} onChange={handleChange}>
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>📅 Due Date *</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={errors.dueDate ? 'error' : ''}
            />
            {errors.dueDate && <span className="error-msg">{errors.dueDate}</span>}
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Add Task</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;