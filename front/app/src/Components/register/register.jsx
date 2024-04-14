import React, { useState } from 'react';
import { ReactSession } from 'react-client-session';
import './register.css';

export const Register = () => {
    ReactSession.setStoreType("localStorage");

    const [formData, setFormData] = useState({
        username: '',
        surname: '',
        password: '',
        confirm_password: '',
        phone: '',
        gmail: ''
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
        
        if (formData.password !== formData.confirm_password) {
            alert('Passwords do not match');
            return;
        }
        else if (formData.password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData), 
        })
        .then(response => response.json())
        .then(data => {
            if (data.access_token) {
                ReactSession.set('access_token', data.access_token);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    if (ReactSession.get('access_token')) {
        window.location.href = '/profile';
    }
    return (
        <form className='reg_form' onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div class="input-group">
                <input value={formData.username} onChange={handleChange} placeholder='username' type="text" id="username" name="username" required></input>
            </div>
            <div class="input-group">
                <input value={formData.surname} onChange={handleChange} placeholder='surname' type="text" id="surname" name="surname" required></input>
            </div>
            <div class="input-group">
                <input value={formData.password} onChange={handleChange} placeholder='password' type="password" id="password" name="password" required></input>
            </div>
            <div class="input-group">
                <input value={formData.confirm_password} onChange={handleChange} placeholder="confirm password" type="password" id="confirm_password" name="confirm_password" required></input>
            </div>
            <div class="input-group">
                <input value={formData.phone} onChange={handleChange} placeholder="phone number" type="tel" id="phone" name="phone" required></input>
            </div>
            <div class="input-group">
                <input value={formData.gmail} onChange={handleChange} placeholder='email' type="email" id="gmail" name="gmail" required></input>
            </div>
            <button type="submit" className='btn btn-secondary'>Submit</button>
        </form>
    );
};