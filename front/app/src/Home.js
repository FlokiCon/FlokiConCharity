import { Navbar } from './Components/nav/navbar';
import { useState, useEffect } from 'react';
import { Cards } from './Components/advert_card/advert_cards';
import { Footer } from './Components/footer/footer';

function Home() {
    const [initialState, setInitialState] = useState({'result': []});
    const endpoint = '/get';

    const crumbs = [
        {path: "/add_advert", name: "Додати запит"},
    ]

    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
            <Cards crumbs={crumbs}></Cards>
        </div>
    );
}

export default Home;
