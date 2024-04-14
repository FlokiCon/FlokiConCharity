import { Navbar } from './Components/nav/navbar';
import { Advert } from './Components/advert_form/advert';

function App() {
    const crumbs = [
        {path: "/login", name: "Ввійти"},
        {path: "/register", name: "Реєстрація"},
        {path: "/advert_list", name: "Стати волонтером"},
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
