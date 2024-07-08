import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import '../css/tripRoutePage.css'; // ייבוא קובץ ה-CSS

import { FaMapMarkerAlt } from "react-icons/fa";

function TripRoute() {
    const location = useLocation();
    console.log("location.state");
    console.log(location);
    const { route } = location.state.route || {};
        const{guide_id}=location.state.guide_id || {};
        const {trip_date}=location.state.trip_date || {};
    // const { route, guide_id, trip_date } = location.state || {};
    const mapRef = useRef();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        if (mapRef.current && route) {
            const map = mapRef.current;
            map.fitBounds(route.map(site => [site.latitude, site.longitude]));
        }
    }, [route]);

    if (!route) {
        return <div>Loading...</div>;
    }

    const routeCoordinates = route.map(site => [
        site.latitude, site.longitude
    ]);

    return (
        <div className={`container ${sidebarOpen ? "sidebar-open" : ""}`}>
            <MapContainer className="map-container"      
                center={[31.0461, 34.8516]}
                zoom={8}
                scrollWheelZoom={true}   
                ref={mapRef}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Polyline positions={routeCoordinates} color="red" />
                {routeCoordinates.map((position, index) => (
                    <Marker key={index} position={position}>
                        <Popup>
                            נקודת ציון מספר {index + 1}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
            <button className="toggle-button" onClick={toggleSidebar}>
                {sidebarOpen ? "less details" : "more details"}
            </button>
            <div className={`route-sidebar ${sidebarOpen ? "open" : ""}`}>
                {console.log("guide")}
              <div className="trip details">  {guide_id && <p>Your guide:  
                <br></br>
                Date of trip: {trip_date}
                </p>}
                {!guide_id && <p>Your guide:  
                <br></br>
                Date of trip: no date</p>}
                {route.map((currentRoute, index) => (
                <div className="route-item" key={currentRoute.id}>
                    <div className="circle"></div>
                    <h2 className="site-name">Name: {currentRoute.site_name}</h2>
                    {index < route.length - 1 && <div className="dashed-line"></div>}
                </div>
            ))}
            </div>   </div>
        </div>
    );
}

export default TripRoute;


// import React, { useEffect, useRef } from "react";
// import { useLocation } from 'react-router-dom';
// import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import '../css/trioRoutes.css'; // ייבוא קובץ ה-CSS
// //import L from "leaflet";
// import { FaMapMarkerAlt } from "react-icons/fa";

// function TripRoute() {
//     const location = useLocation();
//     console.log("location.state")
//     console.log(location);
 
//     const { route } = location.state.route || {};
//     const{guide_id}=location.state.guide_id || {};
//     const {trip_date}=location.state.trip_date || {};
//     const mapRef = useRef();
//        console.log("all details: guide_id: "+guide_id+" trip_date: "+trip_date+" route: "+route) 
//     console.log("route");
//     console.log(route);

//     if (!route) {
//         return <div>Loading...</div>;
//     }
//     const routeCoordinates = route.map(site => [
//         site.latitude, site.longitude
//     ]);
//     console.log(routeCoordinates);
  
//     useEffect(() => {
//         if (mapRef.current) {
//             const map = mapRef.current;
//             map.fitBounds(routeCoordinates);
//         }
//     }, [routeCoordinates]);

//     return (
//         <div>
            


//        <MapContainer className="map-container"      
//                 center={[31.0461, 34.8516]}
//                 zoom={8}
//                 scrollWheelZoom={true}   
//                 ref={mapRef}>
//                 <TileLayer
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                     attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                 />
//                 <Polyline positions={routeCoordinates} color="red" />
//                 {routeCoordinates.map((position, index) => (
//                     <Marker key={index} position={position}>
//                         <Popup>
//                             נקודת ציון מספר {index + 1}
//                         </Popup>
//                     </Marker>
//                 ))}
//             </MapContainer>
       
//             <div className="route-sidebar">
//                 {console.log("guide")}
//           {guide_id&& <p>your guide:  
//           <br></br>
//           date of trip:{trip_date}
//           </p>}  
//           {!guide_id&& <p>your guide:  
//           <br></br>
//           date of trip:no date</p>}
         
//             {/* {chosenRoutes.map((currentRoute, index) => (
//                 <div className="route-item" key={currentRoute.id}>
//                     <div className="circle"></div>
//                     <h2 className="site-name">Name: {currentRoute.site_name}</h2>
//                     {index < chosenRoutes.length - 1 && <div className="dashed-line"></div>}
//                 </div>
//             ))} */}
          
//         </div>
//         </div>
       
//     );
// }

// export default TripRoute;





