import React from 'react';
import '../styles/TaskView.css';

const TaskView = ({ tasks, onUpdateTaskStatus, onDeleteTask }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = React.useState(null);

  const getStatusIcon = (status) => {
    const icons = { 'Completed': '✅', 'In Progress': '⏳', 'Pending': '⏰' };
    return icons[status] || '•';
  };

  const getPriorityIcon = (priority) => {
    const icons = { 'High': '🔴', 'Medium': '🟡', 'Low': '🟢' };
    return icons[priority] || '•';
  };

  const handleDelete = (taskId) => {
    if (showDeleteConfirm === taskId) {
      const task = tasks.find(t => t.id === taskId);
      onDeleteTask(task.employeeId, task.id);
      setShowDeleteConfirm(null);
    } else {
      setShowDeleteConfirm(taskId);
    }
  };

  return (
    <section className="task-view-section">
      <h2 className="section-title">✓ All Tasks</h2>
      {tasks.length === 0 ? (
        <div className="no-tasks-message">
          <p>No tasks found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="tasks-table">
          <div className="tasks-list">
            {tasks.map(task => (
              <div key={task.id} className={`task-row task-${task.status.toLowerCase().replace(' ', '-')}`}>
                <div className="task-info">
                  <h4 className="task-title">{task.title}</h4>
                  <p className="task-employee">👤 {task.employeeName}</p>
                </div>
                <div className="task-meta">
                  <span className="priority">{getPriorityIcon(task.priority)} {task.priority}</span>
                  <span className="due-date">📅 {task.dueDate}</span>
                </div>
                <div className="task-actions">
                  <select
                    className={`status-dropdown status-${task.status.toLowerCase().replace(' ', '-')}`}
                    value={task.status}
                    onChange={(e) => onUpdateTaskStatus(task.employeeId, task.id, e.target.value)}
                  >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                  </select>
                  <span className={`status-badge status-${task.status.toLowerCase().replace(' ', '-')}`}>
                    {getStatusIcon(task.status)}
                  </span>
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
        </div>
      )}
    </section>
  );
};

export default TaskView;