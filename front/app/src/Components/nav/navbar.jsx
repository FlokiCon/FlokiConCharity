import React from 'react';
import './nav.css'

export const Navbar = ({crumbs}) => {

    let items = [];
    for (let i = 0; i < crumbs.length; ++i) {
        items.push(<span key={i} className={crumbs[i].path}>{crumbs[i].name}</span>)
    }

    return (
        <nav className="custom-navbar">
            <div className="divv">
                <span className='logo'>FCC</span>
            </div>
            <div className="divv">
                <div className="crumbs">{items}</div>
                <div className="title-profile-container"></div>
            </div>
            <div className="divv">
                <span className='title'>FlokiCon Charity</span>
                <span className='profile'><img src="/icons/user.png" alt="user icon" className="userico"></img></span>
            </div>
        </nav>
    )
}
