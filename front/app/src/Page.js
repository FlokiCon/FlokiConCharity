import { Navbar } from './Components/nav/navbar';
import { useState, useEffect } from 'react';
import './Components/pag.css';

function Home() {
    const [ad, setAd] = useState([]);

    const crumbs = [
        {path: "/advert_list", name: "Стати волонтером"},
        {path: "/add_advert", name: "Додати запит"},
    ]

    const a_id = new URLSearchParams(window.location.search).get("p");

    useEffect(() => {
        fetch('/get_adverts/'+a_id, {
            method: 'GET',
        }).then(response => response.json()).then(data => { setAd(data); console.log(data) })}, []);

    if (ad.length <= 0) {
        return null;
    }
    return (
        <div className='wrapper'>
            <Navbar crumbs={crumbs}></Navbar>
            <div className="card mb-3">
                <div className="row no-gutters">
                    <div className="col-md-4">
                        <img src={"/get_photo/" + ad[0].advert_id} className="card-img" alt="..." />
                        </div>
                        <div className="col-md-8">
                        <div className="card-body">
                        <h5 className="card-title">{ad[0].title}</h5>
                        <p className="card-text">{ad[0].text}</p>
                        <p className="card-text"><small className="text-muted">John Doe</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
