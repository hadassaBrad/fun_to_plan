// src/UserComponent.js
import React, { useState, useContext } from 'react';
import '../css/userComponent.css';
import { UserContext } from '../App.jsx';
import config from '../config.js';
// src/UserComponent.js


const UserComponent = ({ name, email, role }) => {
  const [selectedRole, setSelectedRole] = useState(role);
  const [isChanged, setIsChanged] = useState(false);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setIsChanged(true);
  };

  const handleConfirmClick = () => {
    // כאן תוכל להוסיף לוגיקה לעדכון התפקיד בבקאנד או בקונטקסט
    console.log(`Updated role for ${name}: ${selectedRole}`);
    setIsChanged(false);
  };

  return (
    <div className="user-component">
      <p className="user_name">{name}</p>
      <p className="user_email">{email}</p>
      <select className="user_role" value={selectedRole} onChange={handleRoleChange}>
        <option value="user">user</option>
        <option value="admin">admin</option>
        <option value="guide">guide</option>
        <option value="guide waiting">guide waiting</option>
      </select>
      {isChanged && (
        <button className="confirm-button" onClick={handleConfirmClick}>
          Confirm
        </button>
      )}
    </div>
  );
};

export default UserComponent;
