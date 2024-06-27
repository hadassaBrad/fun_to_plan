// src/UserComponent.js
import React, { useState, useContext } from 'react';
import '../css/userComponent.css';
import { UserContext } from '../App.jsx';
import config from '../config.js';

const UserComponent = ({ name, email, role }) => {
  const [selectedRole, setSelectedRole] = useState(role);
  const [isChanged, setIsChanged] = useState(false);

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setIsChanged(true);
  };

  const handleConfirmClick = () => {
    // Here you can add the logic to update the role in the backend or context
    console.log(`Updated role for ${name}: ${selectedRole}`);
    setIsChanged(false);
  };

  return (
    <div className="user-component">
      <p className="user_name">{name}</p>
      <p className="user_email">{email}</p>
      <select className="user_role" value={selectedRole} onChange={handleRoleChange}>
        <option value="1">user</option>
        <option value="2">admin</option>
        <option value="3">guide</option>
        <option value="4">guide waiting</option>
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
