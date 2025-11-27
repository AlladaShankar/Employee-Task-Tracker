import React from 'react';
import EmployeeCard from './EmployeeCard';
import '../styles/EmployeeDirectory.css';

const EmployeeDirectory = ({ employees, onUpdateTaskStatus, onDeleteTask, onEmployeeClick, detailedView, onDeleteEmployee }) => (
  <section className="employee-section">
    <h2 className="section-title">{detailedView ? '👥 Employees' : '👥 Employees & Tasks'}</h2>
    {employees.length === 0 ? (
      <div className="no-employees">
        <p>No employees found. Try adjusting your filters or add a new employee.</p>
      </div>
    ) : (
      <div className="employees-grid">
        {employees.map(emp => (
          <EmployeeCard
            key={emp.id}
            employee={emp}
            onUpdateTaskStatus={onUpdateTaskStatus}
            onDeleteTask={onDeleteTask}
            onEmployeeClick={() => onEmployeeClick(emp)}
            detailedView={detailedView}
            onDeleteEmployee={onDeleteEmployee}
          />
        ))}
      </div>
    )}
  </section>
);

export default EmployeeDirectory;