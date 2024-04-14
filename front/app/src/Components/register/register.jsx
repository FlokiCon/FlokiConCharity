import React, { useState } from 'react';
import { ReactSession } from 'react-client-session';
import './register.css';

export const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        login: '',
        password: '',
        password_config: '',
        phone: '',
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
        
        if (formData.password !== formData.password_config) {
            alert('Passwords do not match');
            return;
        }
        else if (formData.password.length < 8) {
            alert('Password must be at least 8 characters long');
            return;
        }

        fetch('/register', {
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
                console.log(data);
                alert('Registered successfully');
                window.location.href = '/';
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <form className='reg_form' onSubmit={handleSubmit}>
            <h2>Зареєструватись</h2>
            <div className="input-group">
                <input value={formData.name} onChange={handleChange} placeholder='імʼя' type="text" id="username" name="name" required></input>
            </div>
            <div className="input-group">
                <input value={formData.surname} onChange={handleChange} placeholder='прізвще' type="text" id="surname" name="surname" required></input>
            </div>
            <div className="input-group">
                <input value={formData.login} onChange={handleChange} placeholder='логін' type="text" id="login" name="login" required></input>
            </div>
            <div className="input-group">
                <input value={formData.password} onChange={handleChange} placeholder='пароль' type="password" id="password" name="password" required></input>
            </div>
            <div className="input-group">
                <input value={formData.password_config} onChange={handleChange} placeholder="підтвердження паролю" type="password" id="confirm_password" name="password_config" required></input>
            </div>
            <div className="input-group">
                <input value={formData.phone} onChange={handleChange} placeholder="номер телефону" type="tel" id="phone" name="phone" required></input>
            </div>
            <button type="submit" className='btn btn-secondary'>Підтвердити</button>
        </form>
    );
};