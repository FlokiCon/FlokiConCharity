import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import Home from './Home';
import Profile from './Profile';

import reportWebVitals from './reportWebVitals';

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

  const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />
    },
    {
      path: "/add_advert",
      element: <App />
    },
    {
      path: "/profile",
      element: <Profile />
    }

  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);
reportWebVitals();