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
import ProjectSubmissionForm from './AdminDashboard/ProjectSubmissionForm/ProjectSubmissionForm ';
import Dashboard from './AdminDashboard/Dashboard/Dashboard';
import Root from './AdminDashboard/Root/Root';
import ClientsList from './AdminDashboard/ClientsList/ClientsList';
import ProjectsList from './AdminDashboard/ProjectsList/ProjectsList';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement:<h2>Error</h2>,
    children:[
      {
        path:"/",
        element:<LandingPage></LandingPage>
      },
      {
        path:'home',
        element:<Home></Home>
      }
    ]
  },
  {
    path:'/dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path:'/dashboard',
        element:<Root></Root>
      },
      {
        path:'projectsubmit',
        element:<ProjectSubmissionForm></ProjectSubmissionForm>
      },
      {
        path:'clientslist',
        element:<ClientsList></ClientsList>
      },
      {
        path:'projectlist',
        element:<ProjectsList></ProjectsList>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>,
)
