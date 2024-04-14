import { Navbar } from './Components/nav/navbar';
import { useState, useEffect } from 'react';
import { UserProfile } from './Components/user_profile/profile'
import { ReactSession } from 'react-client-session';

function Profile() {
    const crumbs = [
        {path: "/login", name: "Ввійти"},
        {path: "/register", name: "Реєстрація"},
        {path: "/advert_list", name: "Стати волонтером"},
        {path: "/add_advert", name: "Додати запит"},
    ]

    const [user, setUser] = useState({});
    const [s, setS] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/get_current_user_id', {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + ReactSession.get('access_token')
            }
        }).then(response => response.json()
            ).then(data => {
                setUser(data);
                fetch('/get_user/' + data.logged_in_as, {
                    method: 'GET',
                }).then(response => response.json()
                    ).then(data1 => {
                        setS(data1);
                        console.log(data1);
                        setLoading(false);
                })
        })
    }, [])

    useEffect(() => {

    }, [])

    if (loading) {
        return null;
    }
    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
            <UserProfile user={{surname: s['user'].surname, name: s['user'].name, login: s['user'].login, phone: s['user'].phone}}></UserProfile>
        </div>
    );
}

export default Profile;
