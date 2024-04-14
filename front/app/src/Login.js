import { Navbar } from './Components/nav/navbar';

function App() {
    const crumbs = [
        {path: "/add_advert", name: "Додати запит"},
    ]

    return (
        <div className="App">
            <Navbar crumbs={crumbs}></Navbar>
        </div>
    );
}

export default App;
