import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Home/Home/Home.jsx';
import Main from './Main/Main';
import LandingPage from './LandingPage/LandingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<h2>Error</h2>,
    children:[
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path:'landing-page',
        element:<LandingPage></LandingPage>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
