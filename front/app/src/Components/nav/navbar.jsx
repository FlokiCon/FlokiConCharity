import React from 'react';
import './nav.css'
export const Navbar = () => {
    return (
        <nav>
            <span className='logo'>FCC</span>
            <span className='title'>FlokiCon Charity</span>
            <span className='profile'><img src="/icons/user.png" alt="user icon" className="userico"></img></span>
        </nav>
    )
}
