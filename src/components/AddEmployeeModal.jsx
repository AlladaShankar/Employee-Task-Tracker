import React, { useState } from 'react';
import '../styles/AddEmployeeModal.css';
import { ROLES, DEPARTMENTS, AVATAR_COLORS } from '../data/mockData';

const AddEmployeeModal = ({ onAddEmployee, onClose, existingEmails }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: 'Frontend Developer',
    department: 'Frontend Team',
    joinDate: new Date().toISOString().split('T')[0]
  });
  const [errors, setErrors] = useState({});

  const generateAvatar = (firstName, lastName) => {
    return (firstName.charAt(0) + lastName.charAt(0)).toUpperCase();
  };

  const getRandomColor = () => {
    return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) newErrors.email = 'Invalid email format';
    else if (existingEmails.includes(formData.email)) newErrors.email = 'Email already exists';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newEmployee = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      role: formData.role,
      department: formData.department,
      joinDate: formData.joinDate,
      avatar: generateAvatar(formData.firstName, formData.lastName),
      avatarColor: getRandomColor()
    };

    onAddEmployee(newEmployee);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-employee" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>👤 Add New Employee</h2>
          <button className="btn-close" onClick={onClose}>✕</button>
        </div>
        <form className="employee-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="First name"
                className={errors.firstName ? 'error' : ''}
                autoFocus
              />
              {errors.firstName && <span className="error-msg">{errors.firstName}</span>}
            </div>
            <div className="form-group">
              <label>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Last name"
                className={errors.lastName ? 'error' : ''}
              />
              {errors.lastName && <span className="error-msg">{errors.lastName}</span>}
            </div>
          </div>

          <div className="form-group">
            <label>📧 Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email@company.com"
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>💼 Role</label>
              <select name="role" value={formData.role} onChange={handleChange}>
                {ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>🏢 Department</label>
              <select name="department" value={formData.department} onChange={handleChange}>
                {DEPARTMENTS.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>📅 Join Date</label>
            <input
              type="date"
              name="joinDate"
              value={formData.joinDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">Create Employee</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;