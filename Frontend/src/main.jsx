import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from './routes/Login.jsx';
import SignUp from './routes/SignUp.jsx';
import Dashboard from './routes/Dashboard.jsx';
//import ProtectedRoute from './routes/ProtectedRoute.jsx';
//import { AuthProvider } from './auth/AuthProvider.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path: "/dashboard",
    element: <Dashboard/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
);


