import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './LandingPage/LandingPage';
import ProjectSubmissionForm from './AdminDashboard/ProjectSubmissionForm/ProjectSubmissionForm.jsx';
import Dashboard from './AdminDashboard/Dashboard/Dashboard';
import Root from './AdminDashboard/Root/Root';
import ClientsList from './AdminDashboard/ClientsList/ClientsList';
import ProjectsList from './AdminDashboard/ProjectsList/ProjectsList';
import TestimonialList from './AdminDashboard/TestimonialList/TestimonialList.jsx';
import TestimonialForm from './AdminDashboard/TestimonialForm/TestimonialForm.jsx';
import Main from './Main/Main.jsx';
import LoadingSpinner from './forAll/LoadingSpinner/LoadingSpinner.jsx';
import { endPoint } from './forAll/forAll.js';
import DetailedProject from './DetailedProject/DetailedProject.jsx';
import AllProjects from './AllProjects/AllProjects.jsx';
import ContactUs from './Contact/ContactUs.jsx';

const App = () => {
  const [loading, setLoading] = useState(true); // Initial loading state

  useEffect(() => {
    // Simulate loading delay (remove this in actual implementation)
    setTimeout(() => {
      setLoading(false); // Set loading to false to hide the spinner
    }, 2000); // Adjust time as needed
  }, []);

  // Define your router configuration inside App component
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      errorElement: <h2>Error</h2>,
      children: [
        {
          path: '/',
          element: <LandingPage />,
        },
      {
        path:'/projects',
        element:<AllProjects/>
      },
      {
        path:'/contact',
        element:<ContactUs/>
      },
      ],
    },
    {
      path: '/dashboard',
      element: <Dashboard />,
      children: [
        {
          path: '/dashboard',
          element: <Root />,
        },
        {
          path: 'projectsubmit',
          element: <ProjectSubmissionForm />,
        },
        {
          path: 'clientslist',
          element: <ClientsList />,
        },
        {
          path: 'projectlist',
          element: <ProjectsList />,
        },
        {
          path: 'testimonial',
          element: <TestimonialList />,
        },
        {
          path: 'testimonialsubmit',
          element: <TestimonialForm />,
        },
      ],
    },
    {
      path: '/project/:id',
      element: <DetailedProject />,
      loader: ({ params }) => fetch(`${endPoint}/project/${params._id}`)
    },
  ]);

  return (
    <React.StrictMode>
      {loading ? (
        // Render a loading indicator while loading is true
        <LoadingSpinner loading={loading} />
      ) : (
        // Render the RouterProvider with loaded router configuration
        <RouterProvider router={router} />
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
