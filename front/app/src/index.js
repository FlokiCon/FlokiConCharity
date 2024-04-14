import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Home from './Home';
import Profile from './Profile';
import Login from './Login';
import About from './About';
import Page from './Page';
import Register from './Register';

import {Footer} from './Components/footer/footer';
import {ReactSession} from 'react-client-session';

import reportWebVitals from './reportWebVitals';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  ReactSession.setStoreType("localStorage");

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
      path: "/register",
      element: <Register />
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