import React from 'react';
import './nav.css'
import { ReactSession } from 'react-client-session';

export const Navbar = ({crumbs}) => {

    let items = [];
    for (let i = 0; i < crumbs.length; ++i) {
        items.push(<a href={crumbs[i].path} key={i}><span>{crumbs[i].name}</span></a>)
    }

    console.log(ReactSession.get('access_token'));

    return (
        <nav className="custom-navbar">
            <div className="divv">
                <span className='logo'><a href="/">FCC</a></span>
            </div>
            <div className="crumbs">
                <div className="crumbs">{items}</div>
                <div className="title-profile-container"></div>
            </div>
            <div className="profile">
                <span className='title'>FlokiCon Charity</span>
                <a href="/profile"><span className='profile'><img src="/icons/user.png" alt="user icon" className="userico"></img></span></a>
            </div>
        </nav>
    )
}
