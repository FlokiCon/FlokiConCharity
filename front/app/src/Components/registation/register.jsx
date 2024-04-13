import React from 'react';
import './registration.css'

export const Reg = () => {

    return (
        <div className="register">
            <div class="register">
            <h1>Створити акаунт</h1>
                <form id="registrationForm" action="/register" method="post">
                    <input type="text" placeholder="name" class="name" name="name"></input>
                    <input type="text" placeholder="surname" class="surname" name="surname"></input>
                    <input type="text" placeholder="login" class="login" name="login"></input>
                    <input type="password" placeholder="password" class="password" name="password"></input>
                    <input type="password" placeholder="password_conf" class="password_config" name="password_config"></input>
                    <input type="tel" placeholder="phone" class="phone" name="phone"></input>
                    <button type="submit" class="submit">Зареєструватися</button>
                </form>
            </div>
        </div>
    )
}
