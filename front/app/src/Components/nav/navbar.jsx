import React from 'react';
import './nav.css'
export const Navbar = ({crumbs}) => {

    let items = [];
    for (let i = 0; i < crumbs.length; ++i) {
        items.push(<span className={crumbs[i].pah}>{crumbs[i].name}</span>)
    }

    return (
        <nav>
            <span className='logo'>FCC</span>
            <span className='title'>FlokiCon Charity</span>
            {items}
            <span className='profile'><img src="/icons/user.png" alt="user icon" className="userico"></img></span>
        </nav>
    )
}
