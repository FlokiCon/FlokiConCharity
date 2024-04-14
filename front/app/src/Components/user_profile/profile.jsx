import React, { useState, useEffect } from 'react';
import './profile.css'

export const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetch('/get_current_user_id', { // Запит на отримання user_id
        method: 'GET'
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
        const userId = data.user_id; // Отриманий user_id з відповіді
        // Потім використовуйте цей userId для запиту до /get_user/${userId}
        fetch(`/get_user/${userId}`, { 
            method: 'GET' 
        })
        .then(response => response.json())
        .then(data => {
            setUserData(data.user);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    })
    .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
    });
  }, []); // Ефект виконується лише один раз при монтуванні компоненту

  if (!userData) {
    return <div className="loading">Loading</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-image">
        <img src={userData.profilePic} alt="Profile Picture" />
      </div>
      <div className="user-info">
        <h2>{userData.name} {userData.surname}</h2>
        <p>Login: <span>{userData.login}</span></p>
        <p>Name: <span>{userData.name}</span></p>
        <p>Surname: <span>{userData.surname}</span></p>
        <p>Phone: <span>{userData.phone}</span></p>
      </div>
    </div>
  );
};

export default UserProfile;
