export const mockData = {
  employees: [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Frontend Developer',
      email: 'alice@company.com',
      department: 'Frontend Team',
      avatar: 'AJ',
      avatarColor: '#3498db',
      joinDate: '2023-01-15',
      tasks: [
        { id: 101, title: 'Build login page', status: 'Completed', priority: 'High', dueDate: '2025-11-20' },
        { id: 102, title: 'Implement dashboard', status: 'In Progress', priority: 'High', dueDate: '2025-12-01' },
        { id: 103, title: 'Create user profile component', status: 'Pending', priority: 'Medium', dueDate: '2025-12-05' }
      ]
    },
    {
      id: 2,
      name: 'Bob Smith',
      role: 'Backend Developer',
      email: 'bob@company.com',
      department: 'Backend Team',
      avatar: 'BS',
      avatarColor: '#e74c3c',
      joinDate: '2023-02-20',
      tasks: [
        { id: 201, title: 'API integration', status: 'Pending', priority: 'High', dueDate: '2025-11-28' },
        { id: 202, title: 'Database optimization', status: 'In Progress', priority: 'Medium', dueDate: '2025-12-02' },
        { id: 203, title: 'Authentication setup', status: 'Completed', priority: 'High', dueDate: '2025-11-15' }
      ]
    },
    {
      id: 3,
      name: 'Carol Davis',
      role: 'UI/UX Designer',
      email: 'carol@company.com',
      department: 'Design Team',
      avatar: 'CD',
      avatarColor: '#f39c12',
      joinDate: '2023-03-10',
      tasks: [
        { id: 301, title: 'Design mockups', status: 'Completed', priority: 'High', dueDate: '2025-11-18' },
        { id: 302, title: 'Create design system', status: 'In Progress', priority: 'High', dueDate: '2025-12-03' },
        { id: 303, title: 'User testing plan', status: 'Pending', priority: 'Low', dueDate: '2025-12-10' }
      ]
    },
    {
      id: 4,
      name: 'David Wilson',
      role: 'DevOps Engineer',
      email: 'david@company.com',
      department: 'Infrastructure Team',
      avatar: 'DW',
      avatarColor: '#9b59b6',
      joinDate: '2023-04-05',
      tasks: [
        { id: 401, title: 'Setup CI/CD pipeline', status: 'Completed', priority: 'High', dueDate: '2025-11-22' },
        { id: 402, title: 'Deploy to production', status: 'In Progress', priority: 'High', dueDate: '2025-11-27' },
        { id: 403, title: 'Monitor server logs', status: 'Pending', priority: 'Medium', dueDate: '2025-11-30' }
      ]
    },
    {
      id: 5,
      name: 'Emma Brown',
      role: 'QA Engineer',
      email: 'emma@company.com',
      department: 'QA Team',
      avatar: 'EB',
      avatarColor: '#1abc9c',
      joinDate: '2023-05-12',
      tasks: [
        { id: 501, title: 'Write test cases', status: 'In Progress', priority: 'High', dueDate: '2025-11-29' },
        { id: 502, title: 'Bug testing phase 1', status: 'Completed', priority: 'Medium', dueDate: '2025-11-25' },
        { id: 503, title: 'Performance testing', status: 'Pending', priority: 'High', dueDate: '2025-12-04' }
      ]
    }
  ]
};

export const ROLES = ['Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'DevOps Engineer', 'QA Engineer', 'Other'];
export const DEPARTMENTS = ['Frontend Team', 'Backend Team', 'Design Team', 'Infrastructure Team', 'QA Team', 'Other'];
export const AVATAR_COLORS = ['#3498db', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c', '#2ecc71', '#e67e22', '#34495e', '#c0392b', '#16a085'];