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

export const UserContext = createContext();

function App() {
  const [userSession,setUserSession]=useState();

  return (
    <UserContext.Provider value={{userSession, setUserSession}}>
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
            <Route path="admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;