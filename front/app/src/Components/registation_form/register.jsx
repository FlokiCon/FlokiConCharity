import React, { useState } from 'react';
import './registration.css';

export const Reg = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        login: '',
        password: '',
        password_config: '',
        phone: ''
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log(data); // Log or handle response from backend
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <div className="register">
            <div className="register">
                <h1>Створити акаунт</h1>
                <form id="registrationForm" onSubmit={handleSubmit}>
                    <input type="text" placeholder="name" className="name" name="name" value={formData.name} onChange={handleChange}></input>
                    <input type="text" placeholder="surname" className="surname" name="surname" value={formData.surname} onChange={handleChange}></input>
                    <input type="text" placeholder="login" className="login" name="login" value={formData.login} onChange={handleChange}></input>
                    <input type="password" placeholder="password" className="password" name="password" value={formData.password} onChange={handleChange}></input>
                    <input type="password" placeholder="password_conf" className="password_config" name="password_config" value={formData.password_config} onChange={handleChange}></input>
                    <input type="tel" placeholder="phone" className="phone" name="phone" value={formData.phone} onChange={handleChange}></input>
                    <button type="submit" className="submit">Зареєструватися</button>
                </form>
            </div>
        </div>
    );
};
