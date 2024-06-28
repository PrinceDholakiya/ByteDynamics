// src/routes/Dashboard.jsx
import React , { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MenuLayout from '../layout/MenuLayout';

const Dashboard = () => {

  const pages = [{title:"Home", path:"/"}, {title:"Log Out", path:"#"}];

  const navigate = useNavigate();

  useEffect(() => {
    if(window.localStorage.getItem("token") === null || window.localStorage.getItem("token") === "") 
    {
      // Clear session storage
      console.log("token is no more");
      sessionStorage.clear();
      // Redirect to previous page
      navigate("/");
    } 
    else 
    {
      console.log("token is " + localStorage.getItem("token"));
    }
  }, [navigate]);

  return (
    <MenuLayout pages={pages}>
    <div>
      <h1>Dashboard</h1>
    </div>
    </MenuLayout>
  );
};

export default Dashboard;
