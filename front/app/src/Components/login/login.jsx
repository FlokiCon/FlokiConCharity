import React, { useState } from 'react';
import { ReactSession } from 'react-client-session';
import './login.css';

export const Login = () => {
    const [formData, setFormData] = useState({
        login: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), 
        })
        .then(response => response.json())
        .then(data => {
            ReactSession.set('access_token', data.access_token);
            console.log(data);
            alert('Logged in successfully');
            window.location.href = '/';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Вхід</h2>
                <div className="form-group">
                    <input
                        placeholder='Логін'
                        type="text"
                        name="login"
                        id="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        placeholder='Пароль'
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-secondary">Увійти</button>
            </form>
        </div>
    );
};