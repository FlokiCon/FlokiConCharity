import { Navbar } from './Components/nav/navbar';
import { Advert } from './Components/advert_form/advert';
import { Reg } from './Components/registation_form/register';
import { useState, useEffect } from 'react';

function App() {
    const crumbs = [
        {path: "/", name: "Головна"},
        {path: "/add_advert", name: "Додати запит"},
    ]

    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
            <Advert></Advert>
        </div>
    );
}

export default App;
