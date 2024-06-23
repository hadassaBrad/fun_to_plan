import React, { createContext, useState } from 'react';
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
import PermissionsManagement from "./pages/PermissionsManagement"
export const UserContext = createContext();
import { useEffect } from 'react';
import config from '../config.js';
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function fetchData() {
    
    }

    fetchData();
}, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<HomeLayout />}>
            <Route index element={<Home />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="about" element={<About />} />
            <Route path="sites" element={<Sites />} />
            <Route path="sites/:siteId" element={<Site />} />
            <Route path="tripRoute" element={<TripRoute />} />
            <Route path="basket" element={<Basket />} />
              <Route path="admin/PermissionsManagement" element={<PermissionsManagement />}/>
            <Route path="admin" element={<Admin />}></Route>

      {/*י לעשות סוג של סגירה ופתיחה לניתובים בתוך האדמין */}
            
            <Route path="usersTable" element={<UsersTable />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
