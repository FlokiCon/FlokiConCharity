import { Navbar } from './Components/nav/navbar';
import { useState, useEffect } from 'react';
import { UserProfile } from './Components/user_profile/profile'

function Profile() {
    const crumbs = [
        {path: "/advert_list", name: "Стати волонтером"},
        {path: "/add_advert", name: "Додати запит"},
    ]

    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
            <UserProfile user={{surname: "John", name: "Doe", login: "jde", phone: "+380 XX XXX XX XX"}}></UserProfile>
        </div>
    );
}

export default Profile;
