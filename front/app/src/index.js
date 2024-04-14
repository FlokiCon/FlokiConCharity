import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import About from './About';
import Page from './Page';
import {Footer} from './Components/footer/footer';

import reportWebVitals from './reportWebVitals';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <About />
    },
    {
      path: '/page',
      element: <Page />
    },
    {
        path: "/advert_list",
        element: <Home />
    },
    {
      path: "/add_advert",
      element: <App />
    },
    {
      path: "/profile",
      element: <Profile />
    },
    {
      path: "/login",
      element: <Login />
    }

  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
    <RouterProvider router={router} />
    <Footer></Footer>
    </>
);
reportWebVitals();