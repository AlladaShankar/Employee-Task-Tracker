import React, { useState } from 'react';
import TaskCard from './TaskCard';
import '../styles/EmployeeCard.css';

const EmployeeCard = ({ employee, onUpdateTaskStatus, onDeleteTask, onEmployeeClick, detailedView, onDeleteEmployee }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const completion = employee.tasks.length > 0
    ? Math.round((employee.tasks.filter(t => t.status === 'Completed').length / employee.tasks.length) * 100)
    : 0;

  const completed = employee.tasks.filter(t => t.status === 'Completed').length;
  const pending = employee.tasks.filter(t => t.status === 'Pending').length;
  const inProgress = employee.tasks.filter(t => t.status === 'In Progress').length;

  const handleDeleteEmployee = (e) => {
    e.stopPropagation();
    if (showDeleteConfirm) {
      onDeleteEmployee(employee.id);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  return (
    <div className="employee-card">
      <div className="employee-card-header">
        <div className="employee-header" onClick={onEmployeeClick}>
          <div className="employee-avatar" style={{ backgroundColor: employee.avatarColor }}>
            {employee.avatar}
          </div>
          <div className="employee-info">
            <h3 className="employee-name">{employee.name}</h3>
            <p className="employee-role">{employee.role}</p>
            <p className="employee-department">{employee.department}</p>
            <p className="employee-email">{employee.email}</p>
          </div>
        </div>
        {detailedView && (
          <button
            className={`btn-delete-emp ${showDeleteConfirm ? 'confirm' : ''}`}
            onClick={handleDeleteEmployee}
            title={showDeleteConfirm ? 'Click again to confirm deletion' : 'Delete employee'}
          >
            {showDeleteConfirm ? '⚠️ Confirm?' : '❌'}
          </button>
        )}
      </div>

      <div className="employee-stats">
        <div className="stat">
          <span className="label">Tasks</span>
          <span className="value">{employee.tasks.length}</span>
        </div>
        <div className="stat">
          <span className="label">✓ Completed</span>
          <span className="value">{completed}</span>
        </div>
        <div className="stat">
          <span className="label">⏳ Progress</span>
          <span className="value">{inProgress}</span>
        </div>
        <div className="stat">
          <span className="label">⏰ Pending</span>
          <span className="value">{pending}</span>
        </div>
      </div>

      <div className="completion-bar-container">
        <div className="completion-label">Completion: {completion}%</div>
        <div className="completion-bar">
          <div className="completion-fill" style={{ width: `${completion}%` }}></div>
        </div>
      </div>

      {!detailedView && (
        <div className="tasks-list">
          {employee.tasks.length === 0 ? (
            <p className="no-tasks">No tasks assigned</p>
          ) : (
            employee.tasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                employeeId={employee.id}
                onUpdateTaskStatus={onUpdateTaskStatus}
                onDeleteTask={onDeleteTask}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;