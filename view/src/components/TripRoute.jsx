// import React, { useEffect, useRef } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "leaflet/dist/leaflet.css";
// import '../css/trioRoutes.css'; // ייבוא קובץ ה-CSS



// function TripRoute({ route }) {
//     const navigate = useNavigate();
// console.log(route);
//     const chosenRoutes = route.route;
//     console.log()
//     const handleNavigate = (selectedRoute) => {
//         console.log("route... in trip route");
//         console.log(selectedRoute);
//         navigate('/home/tripRoute', { state: { route: selectedRoute } });
//     };

//     return (
//         <div>
//             {chosenRoutes.map(currentRoute => (
//                 <div key={currentRoute.id}>
//                     {console.log(currentRoute)}
//                     <h2>Name: {currentRoute.site_name}</h2>
//                 </div>
//             ))}
//             <button onClick={() => handleNavigate(route)}>View Details</button>
//         </div>
//     );
// }

// export default TripRoute;
import React from "react";
import { useNavigate } from "react-router-dom";

import "leaflet/dist/leaflet.css";
import '../css/tripRouteComponent.css'; // ייבוא קובץ ה-CSS

function TripRoute({ route }) {

    const navigate = useNavigate();
    const chosenRoutes = route.route;

    const handleNavigate = () => {
        navigate('/home/tripRoute', { state: route });
    };

    return (
        <div className="route-container">
            {chosenRoutes.map((currentRoute, index) => (
                <div className="route-item" key={currentRoute.id}>
                    <div className="circle"></div>
                    <h2 className="site-name"> {currentRoute.site_name}</h2>
                    {index < chosenRoutes.length - 1 && <div className="dashed-line"></div>}
                </div>
            ))}
            <button onClick={() => handleNavigate()}>View Details</button>
        </div>
    );
}

export default TripRoute;
