import React, { useState, useContext } from 'react';
import '../css/userComponent.css';
import { UserContext } from '../App.jsx';
import config from '../config.js';

const UserComponent = ({ id, name, email, role, guides, setGuides, setHasGuides }) => {

  const [selectedRole, setSelectedRole] = useState(role);
  const [isChanged, setIsChanged] = useState(false);

  

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setIsChanged(true);
  };

  const handleConfirmClick = async () => {
    try {
      const body = {
        role: selectedRole
      }

      await config.putData("users", id, body);
      setIsChanged(false);
      const guidesUpdated = guides.filter(guide => guide.id != id);
     
      if (guidesUpdated.length == 0)
        setHasGuides(false);
      setGuides(guidesUpdated);
    } catch (error) {
      console.error("Error fetching site:", error);
    }
  
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
