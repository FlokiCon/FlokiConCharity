import React from 'react';
import './footer.css';

export const Footer = () => {
    return (
        <footer className="footer">
            <div className="waves">
                <div className="wave" id="wave1"></div>
                <div className="wave" id="wave2"></div>
                <div className="wave" id="wave3"></div>
                <div className="wave" id="wave4"></div>
            </div>
            <ul className="social-icon">
                {/* Facebook */}
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://www.facebook.com/example" target="_blank" rel="noopener noreferrer">
                        <img style={{ width: '30px', height: '30px', marginRight: '20px'}} src="Facebook_f_logo_(2019).svg" alt="Facebook" />
                    </a>
                </li>
                {/* Twitter */}
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://twitter.com/example" target="_blank" rel="noopener noreferrer">
                        <img style={{ width: '40px', height: '30px', marginRight: '20px', color: 'white' }} src="Logo_of_Twitter.svg.png" alt="Twitter" />
                    </a>
                </li>
                {/* LinkedIn */}
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://www.linkedin.com/company/example" target="_blank" rel="noopener noreferrer">
                        <img style={{ width: '30px', height: '30px', marginRight: '20px', color: 'white' }} src="in.jpg" alt="LinkedIn" />
                    </a>
                </li>
                {/* Instagram */}
                <li className="social-icon__item">
                    <a className="social-icon__link" href="https://www.instagram.com/example" target="_blank" rel="noopener noreferrer">
                        <img style={{ width: '30px', height: '30px', marginRight: '20px', color: 'white' }} src="inst.png" alt="Instagram" />
                    </a>
                </li>
            </ul>
            <ul className="menu">
                <li className="menu__item"><a className="menu__link" href="#">Головна</a></li>
                <li className="menu__item"><a className="menu__link" href="#">Стати волонтером</a></li>
                <li className="menu__item"><a className="menu__link" href="#">Додати запит</a></li>
                <li className="menu__item"><a className="menu__link" href="#">Профіль</a></li>
            </ul>
            <p>&copy;2024 FlokiCon Charity. All Rights Reserved</p>
        </footer>
    );
}
