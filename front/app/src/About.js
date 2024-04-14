import { Navbar } from './Components/nav/navbar';
import {About} from './Components/about/about';

function Home() {
    const crumbs = [
        {path: "/login", name: "Ввійти"},
        {path: "/register", name: "Реєстрація"},
        {path: "/advert_list", name: "Стати волонтером"},
        {path: "/add_advert", name: "Додати запит"},
    ]
    return (
        <>
            <Navbar crumbs={crumbs}></Navbar>
            <About></About>
        </>
    );
}

export default Home;
