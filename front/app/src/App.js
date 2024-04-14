import { Reg } from './Components/registation_form/register';
import { Navbar } from './Components/nav/navbar';
import { Advert } from './Components/advert_form/advert';
import { Footer } from './Components/footer/footer';

function App() {
    const crumbs = [
        {path: "/advert_list", name: "Стати волонтером"},
        {path: "/add_advert", name: "Додати запит"},
    ];

    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
            <Advert></Advert>
        </div>
    );
}


export default App;
