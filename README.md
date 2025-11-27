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
4. Deployment Link: https://employee-task-tracker-xi.vercel.app/

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

## Framework and Libraries Used

- **React 18**
  - Functional components
  - Hooks (`useState`, `useEffect`) for state and side effects
- **JavaScript (ES6+)**
- **CSS3** for styling
  - Custom CSS files per component
  - Flexbox and CSS Grid for layout
  - CSS variables for color theme and tokens
- **Browser localStorage**
  - Persists employees and tasks across page refreshes
  - Used as a lightweight mock “database”
- **No backend / API**
  - All data is handled on the client side
  - Mock data loaded from a local module on first run

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
