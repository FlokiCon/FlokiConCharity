import React, { useEffect } from 'react';
import './footer.css';
import { useState } from 'react';

export const Footer = () => {
    return (
        <footer>
            <div className="footer-content">
                <div className="footer-section about">
                    <h1 className="logo-text">FlokiCon Charity</h1>
                    <p>
                        Платформа для надання допомоги постраждалим у війні.
                    </p>
                    <div className="contact">
                        <span><i className="fas fa-phone"></i> +380 XX XXX XX XX</span>
                        <span><i className="fas fa-envelope"></i> contact@flokoncharity.com</span>
                    </div>
                </div>
                <div className="footer-section links">
                    <h2>Швидкі посилання</h2>
                    <ul>
                        <a href="/"><li>Головна</li></a>
                        <a href="/advert_list"><li>Оголошення</li></a>
                        <a href="/add_advert"><li>Додати запит</li></a>
                    </ul>
                </div>
            </div>
            <div className="footer-bottom">
                &copy; 2024 FlokiCon Charity. Всі права захищені.
            </div>
        </footer>
    )
}