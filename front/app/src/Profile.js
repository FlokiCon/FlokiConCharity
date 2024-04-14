import { Navbar } from './Components/nav/navbar';
import { useState, useEffect } from 'react';
import { UserProfile } from './Components/user_profile/profile'

function Profile() {
    const crumbs = [
        {path: "/add_advert", name: "Додати запит"},
    ]

    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
            <UserProfile></UserProfile>
        </div>
    );
}

export default Profile;
