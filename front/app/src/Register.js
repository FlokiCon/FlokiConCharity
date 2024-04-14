import { Navbar } from './Components/nav/navbar';
import { ReactSession }  from 'react-client-session';
import { Register } from './Components/register/register';

function App() {
    const crumbs = [
        {path: "/advert_list", name: "Стати волонтером"},
        {path: "/add_advert", name: "Додати запит"},
    ]

    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
            <Register></Register>
        </div>
    );
}

export default App;
