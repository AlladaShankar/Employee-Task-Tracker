# Employee Task Tracker

Full-featured React application for managing employees and tasks with add/delete functionality.

## Features

✅ **Employee Management**
- Add new employees
- Delete employees (with confirmation)
- View employee profiles
- Department and role assignment

✅ **Task Management**
- Assign tasks to employees
- Update task status
- Delete tasks
- Filter and search

✅ **Dashboard**
- 7 statistics cards
- Real-time updates
- Completion rates

✅ **Local Storage**
- Auto-save all data
- Persistent storage

## Installation

1. Extract: `unzip employee-task-tracker.zip`
2. Install: `npm install`
3. Run: `npm start`
4. Open: http://localhost:3000

## Usage

### Add Employee
- Click "+ Add Employee" button
- Fill form (Name, Email, Role, Department)
- Click "Create Employee"

### Delete Employee
- Go to Employees tab
- Click ❌ on employee card
- Confirm deletion

### Add Task
- Click "+ Add Task" button
- Select employee
- Fill task details
- Click "Add Task"

## Components

- App.jsx - Main component
- Navigation.jsx - Tab navigation
- Dashboard.jsx - Statistics
- EmployeeDirectory.jsx - Employee grid
- EmployeeCard.jsx - Employee display
- EmployeeDetailModal.jsx - Profile modal
- AddEmployeeModal.jsx - Add employee form
- TaskCard.jsx - Task display
- TaskView.jsx - All tasks view
- AddTaskModal.jsx - Add task form
