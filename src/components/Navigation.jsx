import React from 'react';
import '../styles/Navigation.css';

const Navigation = ({ activeTab, onTabChange, onAddTaskClick, onAddEmployeeClick }) => (
  <nav className="navbar">
    <div className="navbar-container">
      <div className="navbar-logo">
        <span className="logo-icon">📋</span>
        <h1>Task Tracker</h1>
      </div>
      <div className="nav-tabs">
        <button
          className={`nav-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onTabChange('dashboard')}
        >
          📊 Dashboard
        </button>
        <button
          className={`nav-tab ${activeTab === 'employees' ? 'active' : ''}`}
          onClick={() => onTabChange('employees')}
        >
          👥 Employees
        </button>
        <button
          className={`nav-tab ${activeTab === 'tasks' ? 'active' : ''}`}
          onClick={() => onTabChange('tasks')}
        >
          ✓ Tasks
        </button>
      </div>
      <div className="nav-buttons">
        <button className="btn-add-employee" onClick={onAddEmployeeClick}>
          + Add Employee
        </button>
        <button className="btn-add-task" onClick={onAddTaskClick}>
          + Add Task
        </button>
      </div>
    </div>
  </nav>
);

export default Navigation;