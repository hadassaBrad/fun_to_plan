import React, { createContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import './App.css';
import Home from './pages/Home';
import HomeLayout from './components/homeLayout';
import About from './pages/About';
import Sites from './pages/Sites';
import Gallery from './pages/Gallery';
import Site from './pages/Site';
import Admin from './pages/Admin';
import TripRoute from "./pages/TripRoute";
import Basket from "./pages/Basket";
import UsersTable from "./pages/UsersTable";
 import PermissionsManagement from "./pages/PermissionsManagement";
import config from './config.js';
import TripRoutes from './pages/TripRoutes.jsx';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);


  useEffect(() => {
    
    async function fetchData() {
      const currentUser = await config.getData("authentication", null, null, null, null, null, null);
     if(currentUser)
      setUser(currentUser);
    else
    setUser(null);
      setLoading(false);
    }

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while user data is being fetched
  }

  return (
    <UserContext.Provider value={{ user, setUser, showLogin, setShowLogin }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="sites" element={<Sites />} />
            <Route path="sites/:siteId" element={<Site />} />
            <Route path="tripRoutes" element={<TripRoutes />} />
            <Route path="basket" element={<Basket />} />
            <Route path="admin/PermissionsManagement" element={<PermissionsManagement />} />
            <Route path="admin" element={<Admin />}></Route>
            <Route path="usersTable" element={<UsersTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;