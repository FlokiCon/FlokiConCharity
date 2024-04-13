import { Navbar } from './Components/nav/navbar';
import { useState, useEffect } from 'react';

function Profile() {
    const crumbs = [
        {path: "/add_advert", name: "Додати запит"},
        {path: "/adverts", name: "Хочу допомогти"},
    ]

    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
        </div>
    );
}

export default Profile;
