import { Navbar } from './Components/nav/navbar';
import { useState, useEffect } from 'react';

function Profile() {
    const crumbs = [
        {path: "/add_advert", name: "Додати запит"},
    ]

    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
        </div>
    );
}

export default Profile;
