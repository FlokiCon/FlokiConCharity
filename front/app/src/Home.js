import { Navbar } from './Components/nav/navbar';
import { useState, useEffect } from 'react';
import { Cards } from './Components/advert_card/advert_cards';

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
            <Cards page={1}></Cards>
        </div>
    );
}

export default App;
