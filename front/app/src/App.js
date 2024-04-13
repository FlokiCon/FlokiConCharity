import { Navbar } from './Components/nav/navbar';
import { Advert } from './Components/advert/advert';
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
            <Navbar></Navbar>
            <Advert></Advert>
        </div>
    );
}

export default App;
