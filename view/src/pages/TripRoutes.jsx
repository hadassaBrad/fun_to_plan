
// import React, { useEffect, useContext, useState } from "react";
// import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import '../css/trioRoutes.css'; // ייבוא קובץ ה-CSS
// import config from "../config";
// import { UserContext } from '../App';

// function TripRoutes() {
//     const { user } = useContext(UserContext);
//     const [routes, setRoutes] = useState([]);

//     useEffect(() => {
//         console.log("Fetching routes...");
//         const fetchRoutes = async () => {
//             const data = await config.getData("trips", ["user_id"], [user.id]);
//             setRoutes(data);
//             console.log("Routes fetched:", data);
//         };
//         fetchRoutes();
//     }, [user.id]);

//     return (
//         <div className="container">
//             <h1>vvvv</h1>
//             <h1>vvvv</h1>
//             {routes.map(route => <h1 key={route.id}>{route.id}</h1>)}
//         </div>
//     );
// }

// export default TripRoutes;

import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
// import '../css/trioRoutes.css'; // ייבוא קובץ ה-CSS
import config from "../config";
import { UserContext } from '../App';
import TripRoute from "../components/TripRoute";

function TripRoutes() {
    const { user } = useContext(UserContext);
    const [routes, setRoutes] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Fetching routes...");
        const fetchRoutes = async () => {
let data;
            if(user.role=="user"){
                            data = await config.getData("trips", ["user_id"], [user.id]);

            }
            if(user.role=="guide"){
                data = await config.getData("trips", ["guide_id"], [user.id]);

            }
            setRoutes(data);
            console.log("Routes fetched:", data);


        };
        fetchRoutes();
    }, [user.id]);

    return (
        <div className="container">
            <h1>Routes</h1>

            {routes.map(route => (
                <div key={route.id}>
                    <h1></h1>
                    {console.log(" route in all triproutes: "+route)}
                    <TripRoute route={route} />
                </div>
            ))}
        </div>
    );
}

export default TripRoutes;
