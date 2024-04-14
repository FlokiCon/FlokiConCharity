import React, { useState, useEffect } from 'react';
import './profile.css'

export const UserProfile = ({user}) => {

  return (
    <div className='wrapper'>
    <div className="profile-container">
      <div className="profile-image">
        <img alt="Profile Picture" />
      </div>
      <div className="user-info">
        <h2>{user.name} {user.surname}</h2>
        <p>Login: <span>{user.login}</span></p>
        <p>Name: <span>{user.name}</span></p>
        <p>Surname: <span>{user.surname}</span></p>
        <p>Phone: <span>{user.phone}</span></p>
      </div>
    </div>
    </div>
  );
};

export default UserProfile;
