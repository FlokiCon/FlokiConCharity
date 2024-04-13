import { Navbar } from './Components/nav/navbar';
import { Advert } from './Components/advert_form/advert';
import { Reg } from './Components/registation_form/register';
import { useState, useEffect } from 'react';

function App() {
    const [initialState, setInitialState] = useState({'result': []});
    const endpoint = '/get';

    // useEffect(() => {
    //   fetch(endpoint, {
    //     method: 'GET',
    //   }).then(response => response.json()
    //     ).then(data => {
    //       setInitialState(data);
    //     })
    // }, []);

    return (
        <div className="App">
            <Navbar crumbs={[{path: "/", name: "Home"}]}></Navbar>
            <Advert></Advert>
            <Reg></Reg>
        </div>
    );
}

export default App;
