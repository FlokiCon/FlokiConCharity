import { Navbar } from './Components/nav/navbar';
import { useState, useEffect } from 'react';
import { Cards } from './Components/advert_card/advert_cards';
import './Components/pag.css';

function Home() {
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        console.log('current page is', currentPage);
    }, [currentPage]);
    const crumbs = [
        {path: "/login", name: "Ввійти"},
        {path: "/register", name: "Реєстрація"},
        {path: "/advert_list", name: "Стати волонтером"},
        {path: "/add_advert", name: "Додати запит"},
    ]
    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
            <Cards page={currentPage}></Cards>
            <nav aria-label="Page navigation example" className='pagin'>
                <ul className="pagination">
                    <li className="page-item"><a className="page-link" onClick={() => {if (currentPage - 1 >= 1) {setCurrentPage(currentPage - 1)}}} href="#">Previous</a></li>
                    <li className="page-item"><a className="page-link" onClick={() => setCurrentPage(currentPage + 1)} href="#">Next</a></li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;
