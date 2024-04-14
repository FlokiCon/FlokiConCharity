import React, { useState } from 'react';
import './register.css';

export const Register = () => {
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
            console.log(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <form className='reg_form'>
            <h2>Register</h2>
            <div class="input-group">
                <input placeholder='username' type="text" id="username" name="username" required></input>
            </div>
            <div class="input-group">
                <input placeholder='surname' type="text" id="surname" name="surname" required></input>
            </div>
            <div class="input-group">
                <input placeholder='password' type="password" id="password" name="password" required></input>
            </div>
            <div class="input-group">
                <input placeholder="confirm password" type="password" id="confirm_password" name="confirm_password" required></input>
            </div>
            <div class="input-group">
                <input placeholder="phone number" type="tel" id="phone" name="phone" required></input>
            </div>
            <div class="input-group">
                <input placeholder='email'  type="email" id="gmail" name="gmail" required></input>
            </div>
            <button type="submit" className='btn btn-secondary'>Submit</button>
        </form>
    );
};