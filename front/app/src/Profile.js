import { Navbar } from './Components/nav/navbar';
import { useState, useEffect } from 'react';
import { UserProfile } from './Components/user_profile/profile'
import { ReactSession } from 'react-client-session';

function Profile() {
    const crumbs = [
        {path: "/advert_list", name: "Стати волонтером"},
        {path: "/add_advert", name: "Додати запит"},
    ]

    const [user, setUser] = useState({});

    useEffect(() => {
        fetch('/get_current_user_id', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + ReactSession.get('access_token')
            }
        }).then(response => response.json()
            ).then(data => {
                setUser(data);
                console.log(ReactSession.get('access_token'));
        })
    }, [])

    
    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
            <UserProfile user={{surname: "John", name: "Doe", login: "jde", phone: "+380 XX XXX XX XX"}}></UserProfile>
        </div>
    );
}

export default Profile;
