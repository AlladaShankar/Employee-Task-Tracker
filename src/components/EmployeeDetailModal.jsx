import React, { useState } from 'react';
import '../styles/EmployeeDetailModal.css';

const EmployeeDetailModal = ({ employee, onClose, onUpdateTaskStatus, onDeleteTask, onDeleteEmployee }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [showDeleteEmpConfirm, setShowDeleteEmpConfirm] = useState(false);

  const getStatusIcon = (status) => {
    const icons = { 'Completed': '✅', 'In Progress': '⏳', 'Pending': '⏰' };
    return icons[status] || '•';
  };

  const getPriorityIcon = (priority) => {
    const icons = { 'High': '🔴', 'Medium': '🟡', 'Low': '🟢' };
    return icons[priority] || '•';
  };

  const stats = {
    total: employee.tasks.length,
    completed: employee.tasks.filter(t => t.status === 'Completed').length,
    inProgress: employee.tasks.filter(t => t.status === 'In Progress').length,
    pending: employee.tasks.filter(t => t.status === 'Pending').length,
    completion: employee.tasks.length > 0 ? Math.round((employee.tasks.filter(t => t.status === 'Completed').length / employee.tasks.length) * 100) : 0
  };

  const handleDelete = (taskId) => {
    if (showDeleteConfirm === taskId) {
      onDeleteTask(employee.id, taskId);
      setShowDeleteConfirm(null);
    } else {
      setShowDeleteConfirm(taskId);
    }
  };

  const handleDeleteEmployee = () => {
    if (showDeleteEmpConfirm) {
      onDeleteEmployee(employee.id);
    } else {
      setShowDeleteEmpConfirm(true);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-employee">
            <div className="employee-avatar" style={{ backgroundColor: employee.avatarColor }}>
              {employee.avatar}
            </div>
            <div>
              <h2>{employee.name}</h2>
              <p className="modal-subtitle">{employee.role} • {employee.department}</p>
            </div>
          </div>
          <div className="modal-header-actions">
            <button
              className={`btn-delete-emp ${showDeleteEmpConfirm ? 'confirm' : ''}`}
              onClick={handleDeleteEmployee}
              title={showDeleteEmpConfirm ? 'Click to confirm' : 'Delete employee'}
            >
              {showDeleteEmpConfirm ? '⚠️' : '❌'}
            </button>
            <button className="btn-close" onClick={onClose}>✕</button>
          </div>
        </div>

        <div className="modal-body">
          <div className="employee-details">
            <div className="detail-item">
              <span className="label">📧 Email:</span>
              <span className="value">{employee.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">📅 Join Date:</span>
              <span className="value">{employee.joinDate}</span>
            </div>
          </div>

          <div className="employee-stats-grid">
            <div className="stat-box">
              <span className="stat-label">Total Tasks</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Completed</span>
              <span className="stat-value" style={{ color: '#27ae60' }}>{stats.completed}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">In Progress</span>
              <span className="stat-value" style={{ color: '#f39c12' }}>{stats.inProgress}</span>
            </div>
            <div className="stat-box">
              <span className="stat-label">Pending</span>
              <span className="stat-value" style={{ color: '#e74c3c' }}>{stats.pending}</span>
            </div>
          </div>

          <div className="completion-bar-container">
            <div className="completion-label">Overall Completion: {stats.completion}%</div>
            <div className="completion-bar">
              <div className="completion-fill" style={{ width: `${stats.completion}%` }}></div>
            </div>
          </div>

          <div className="employee-tasks">
            <h3>Assigned Tasks</h3>
            {employee.tasks.length === 0 ? (
              <p className="no-tasks">No tasks assigned</p>
            ) : (
              <div className="tasks-list">
                {employee.tasks.map(task => (
                  <div key={task.id} className={`task-item task-${task.status.toLowerCase().replace(' ', '-')}`}>
                    <div className="task-title-section">
                      <h4>{task.title}</h4>
                      <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
                        {getStatusIcon(task.status)}
                      </span>
                    </div>
                    <div className="task-details">
                      <span>{getPriorityIcon(task.priority)} {task.priority}</span>
                      <span>📅 {task.dueDate}</span>
                    </div>
                    <div className="task-controls">
                      <select
                        className={`status-dropdown status-${task.status.toLowerCase().replace(' ', '-')}`}
                        value={task.status}
                        onChange={(e) => onUpdateTaskStatus(employee.id, task.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(task.id)}
                      >
                        {showDeleteConfirm === task.id ? '⚠️' : '🗑️'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetailModal;