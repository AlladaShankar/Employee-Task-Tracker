import React, { useState } from 'react';
import '../styles/TaskCard.css';

const TaskCard = ({ task, employeeId, onUpdateTaskStatus, onDeleteTask }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const getStatusIcon = (status) => {
    const icons = { 'Completed': '✅', 'In Progress': '⏳', 'Pending': '⏰' };
    return icons[status] || '•';
  };

  const getPriorityIcon = (priority) => {
    const icons = { 'High': '🔴', 'Medium': '🟡', 'Low': '🟢' };
    return icons[priority] || '•';
  };

  const handleDelete = () => {
    if (showDeleteConfirm) {
      onDeleteTask(employeeId, task.id);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className={`task-card task-${task.status.toLowerCase().replace(' ', '-')}`}>
      <div className="task-header">
        <h4 className="task-title">{task.title}</h4>
        <button
          className="btn-delete"
          onClick={handleDelete}
          title={showDeleteConfirm ? 'Confirm delete' : 'Delete'}
        >
          {showDeleteConfirm ? '⚠️' : '🗑️'}
        </button>
      </div>
      <div className="task-meta">
        <span className="priority">{getPriorityIcon(task.priority)} {task.priority}</span>
        <span className="due-date">📅 {task.dueDate}</span>
      </div>
      <div className="task-footer">
        <select
          className={`status-dropdown status-${task.status.toLowerCase().replace(' ', '-')}`}
          value={task.status}
          onChange={(e) => onUpdateTaskStatus(employeeId, task.id, e.target.value)}
          onClick={(e) => e.stopPropagation()}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
          {getStatusIcon(task.status)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;