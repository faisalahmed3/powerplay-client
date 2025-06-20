import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router';

import Home from './pages/Home/Home';
import Hero from './pages/Hero/Hero';
import Error from './pages/Error/Error';
import BookEvents from './pages/BookEvents/BookEvents';
import MyBookings from './pages/MyBookings/MyBookings';
import ManageEvents from './pages/ManageEvents/ManageEvents';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import PrivateRoute from './routes/ProtectedRoute.jsx';
import AuthProvider from './context/AuthContext.jsx';
import { Toaster } from 'react-hot-toast';
import Create from './components/Create/Create.jsx';
import Mine from './components/Mine/Mine.jsx';
import EventDetails from './pages/EventDetails/EventDetails'; 

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { path: '/', element: <Hero /> },
      {
        path: '/book-events',
        element: (
          <PrivateRoute>
            <BookEvents />
          </PrivateRoute>
        ),
      },
      {
        path: '/event/:id', 
        element: (
          <PrivateRoute>
            <EventDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/my-booking',
        element: (
          <PrivateRoute>
            <MyBookings />
          </PrivateRoute>
        ),
      },
      {
        path: '/manage-event',
        element: (
          <PrivateRoute>
            <ManageEvents />
          </PrivateRoute>
        ),
        children: [
          { path: 'create', element: <Create /> },
          { path: '', element: <Mine /> },
        ],
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '*', element: <Error /> },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
