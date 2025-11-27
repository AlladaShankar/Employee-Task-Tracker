import React from 'react';
import '../styles/Dashboard.css';

const Dashboard = ({ employees }) => {
  const stats = (() => {
    let total = 0, completed = 0, pending = 0, inProgress = 0;
    employees.forEach(emp => {
      emp.tasks.forEach(task => {
        total++;
        if (task.status === 'Completed') completed++;
        else if (task.status === 'Pending') pending++;
        else if (task.status === 'In Progress') inProgress++;
      });
    });
    return {
      totalTasks: total,
      completedTasks: completed,
      pendingTasks: pending,
      inProgressTasks: inProgress,
      completionPercentage: total > 0 ? Math.round((completed / total) * 100) : 0,
      totalEmployees: employees.length,
      avgTasksPerEmp: total > 0 ? (total / employees.length).toFixed(1) : 0
    };
  })();

  return (
    <section className="dashboard">
      <h2 className="dashboard-title">📊 Dashboard Overview</h2>
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📋</div>
          <div><h3>Total Tasks</h3><p className="stat-number">{stats.totalTasks}</p></div>
        </div>
        <div className="stat-card completed">
          <div className="stat-icon">✅</div>
          <div><h3>Completed</h3><p className="stat-number">{stats.completedTasks}</p></div>
        </div>
        <div className="stat-card in-progress">
          <div className="stat-icon">⏳</div>
          <div><h3>In Progress</h3><p className="stat-number">{stats.inProgressTasks}</p></div>
        </div>
        <div className="stat-card pending">
          <div className="stat-icon">⏰</div>
          <div><h3>Pending</h3><p className="stat-number">{stats.pendingTasks}</p></div>
        </div>
        <div className="stat-card percentage">
          <div className="stat-icon">📈</div>
          <div><h3>Completion Rate</h3><p className="stat-number">{stats.completionPercentage}%</p></div>
        </div>
        <div className="stat-card employees">
          <div className="stat-icon">👥</div>
          <div><h3>Total Employees</h3><p className="stat-number">{stats.totalEmployees}</p></div>
        </div>
        <div className="stat-card avg">
          <div className="stat-icon">📊</div>
          <div><h3>Avg Tasks/Emp</h3><p className="stat-number">{stats.avgTasksPerEmp}</p></div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;