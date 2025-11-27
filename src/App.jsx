import React, { useState, useEffect } from 'react';
import './styles/App.css';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import EmployeeDirectory from './components/EmployeeDirectory';
import TaskView from './components/TaskView';
import AddTaskModal from './components/AddTaskModal';
import AddEmployeeModal from './components/AddEmployeeModal';
import EmployeeDetailModal from './components/EmployeeDetailModal';
import { mockData } from './data/mockData';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isEmployeeModalOpen, setIsEmployeeModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEmployeeDetailOpen, setIsEmployeeDetailOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('All');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const storedData = localStorage.getItem('employeeTaskData');
    if (storedData) {
      try {
        setEmployees(JSON.parse(storedData));
      } catch (error) {
        console.error('Error loading data:', error);
        setEmployees(mockData.employees);
      }
    } else {
      setEmployees(mockData.employees);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('employeeTaskData', JSON.stringify(employees));
  }, [employees]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddTask = (newTask) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === newTask.employeeId
        ? { ...emp, tasks: [...emp.tasks, newTask.task] }
        : emp
    );
    setEmployees(updatedEmployees);
    setIsTaskModalOpen(false);
    showNotification('✅ Task added successfully!');
  };

  const handleUpdateTaskStatus = (employeeId, taskId, newStatus) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === employeeId
        ? {
            ...emp,
            tasks: emp.tasks.map(task =>
              task.id === taskId ? { ...task, status: newStatus } : task
            )
          }
        : emp
    );
    setEmployees(updatedEmployees);
  };

  const handleDeleteTask = (employeeId, taskId) => {
    const updatedEmployees = employees.map(emp =>
      emp.id === employeeId
        ? { ...emp, tasks: emp.tasks.filter(task => task.id !== taskId) }
        : emp
    );
    setEmployees(updatedEmployees);
    showNotification('🗑️ Task deleted');
  };

  const handleAddEmployee = (newEmployee) => {
    const employee = {
      id: Date.now(),
      ...newEmployee,
      tasks: []
    };
    setEmployees([...employees, employee]);
    setIsEmployeeModalOpen(false);
    showNotification('👤 Employee added successfully!');
  };

  const handleDeleteEmployee = (employeeId) => {
    const updatedEmployees = employees.filter(emp => emp.id !== employeeId);
    setEmployees(updatedEmployees);
    setIsEmployeeDetailOpen(false);
    showNotification('👤 Employee removed');
  };

  const getFilteredEmployees = () => {
    return employees
      .filter(emp => departmentFilter === 'All' || emp.department === departmentFilter)
      .filter(emp => emp.name.toLowerCase().includes(searchQuery.toLowerCase()) || emp.email.toLowerCase().includes(searchQuery.toLowerCase()));
  };

  const getFilteredTasks = () => {
    let allTasks = [];
    employees.forEach(emp => {
      emp.tasks.forEach(task => {
        allTasks.push({ ...task, employeeName: emp.name, employeeId: emp.id });
      });
    });

    if (selectedStatus !== 'All') {
      allTasks = allTasks.filter(task => task.status === selectedStatus);
    }

    if (searchQuery.trim()) {
      allTasks = allTasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return allTasks;
  };

  const filteredEmployees = getFilteredEmployees();
  const filteredTasks = getFilteredTasks();

  const handleEmployeeClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEmployeeDetailOpen(true);
  };

  return (
    <div className="app">
      <Navigation 
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onAddTaskClick={() => setIsTaskModalOpen(true)}
        onAddEmployeeClick={() => setIsEmployeeModalOpen(true)}
      />

      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      <main className="app-main">
        {activeTab === 'dashboard' && (
          <>
            <Dashboard employees={employees} />
            <section className="controls-section">
              <div className="filter-group">
                <label>Filter by Status:</label>
                <div className="filter-buttons">
                  {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
                    <button
                      key={status}
                      className={`filter-btn ${selectedStatus === status ? 'active' : ''}`}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search tasks by title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </section>
            <EmployeeDirectory
              employees={filteredEmployees}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onDeleteTask={handleDeleteTask}
              onEmployeeClick={handleEmployeeClick}
            />
          </>
        )}

        {activeTab === 'employees' && (
          <>
            <div className="controls-section">
              <div className="filter-group">
                <label>Filter by Department:</label>
                <div className="filter-buttons">
                  {['All', 'Frontend Team', 'Backend Team', 'Design Team', 'Infrastructure Team', 'QA Team', 'Other'].map(dept => (
                    <button
                      key={dept}
                      className={`filter-btn ${departmentFilter === dept ? 'active' : ''}`}
                      onClick={() => setDepartmentFilter(dept)}
                    >
                      {dept === 'All' ? 'All' : dept}
                    </button>
                  ))}
                </div>
              </div>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>
            <EmployeeDirectory
              employees={filteredEmployees}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onDeleteTask={handleDeleteTask}
              onEmployeeClick={handleEmployeeClick}
              detailedView={true}
              onDeleteEmployee={handleDeleteEmployee}
            />
          </>
        )}

        {activeTab === 'tasks' && (
          <>
            <section className="controls-section">
              <div className="filter-group">
                <label>Filter by Status:</label>
                <div className="filter-buttons">
                  {['All', 'Pending', 'In Progress', 'Completed'].map(status => (
                    <button
                      key={status}
                      className={`filter-btn ${selectedStatus === status ? 'active' : ''}`}
                      onClick={() => setSelectedStatus(status)}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
              </div>
            </section>
            <TaskView
              tasks={filteredTasks}
              onUpdateTaskStatus={handleUpdateTaskStatus}
              onDeleteTask={handleDeleteTask}
            />
          </>
        )}
      </main>

      {isTaskModalOpen && (
        <AddTaskModal
          employees={employees}
          onAddTask={handleAddTask}
          onClose={() => setIsTaskModalOpen(false)}
        />
      )}

      {isEmployeeModalOpen && (
        <AddEmployeeModal
          onAddEmployee={handleAddEmployee}
          onClose={() => setIsEmployeeModalOpen(false)}
          existingEmails={employees.map(e => e.email)}
        />
      )}

      {isEmployeeDetailOpen && selectedEmployee && (
        <EmployeeDetailModal
          employee={selectedEmployee}
          onClose={() => setIsEmployeeDetailOpen(false)}
          onUpdateTaskStatus={handleUpdateTaskStatus}
          onDeleteTask={handleDeleteTask}
          onDeleteEmployee={handleDeleteEmployee}
        />
      )}
    </div>
  );
};

export default App;