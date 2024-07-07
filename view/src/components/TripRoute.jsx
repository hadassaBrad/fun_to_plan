import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
 import '../css/trioRoutes.css'; // ייבוא קובץ ה-CSS


 import React from 'react';
 
 function TripRoute({ route }) {
    const navigate=useNavigate();

    const chosenRoutes=route.route;

     const handleNavigate = (selectedRoute) => {
         navigate('/home/tripRoute', { state: { route: selectedRoute } });
     };
 
     return (
         <div>
             {chosenRoutes.map(currentRoute => (
                 <div key={currentRoute.id}>
                     <h2>Name: {currentRoute.name}</h2>
                     <p>Description: {currentRoute.description}</p>
                     <button onClick={() => handleNavigate(currentRoute)}>View Details</button>
                 </div>
             ))}
         </div>
     );
 }
 
 export default TripRoute;
 