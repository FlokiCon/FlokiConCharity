import { Navbar } from './Components/nav/navbar';
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
        </div>
    );
}

export default App;
