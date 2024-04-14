import { Navbar } from './Components/nav/navbar';
import { Login } from './Components/login/login';
import { ReactSession }  from 'react-client-session';

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
            <Login></Login>
        </div>
    );
}

export default App;
