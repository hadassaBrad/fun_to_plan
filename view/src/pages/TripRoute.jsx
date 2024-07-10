import React, { useEffect, useContext, useRef, useState } from "react";

import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import '../css/tripRoutePage.css'; // Import CSS
import config from '../config.js';
import { UserContext } from '../App';
function TripRoute() {
    const location = useLocation();
    const { user } = useContext(UserContext);
    const route = location.state || {};
    const guide_id = route.guide_id;
    const trip_date = route.trip_date;

    const mapRef = useRef();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [guidename, setGuidename] = useState(null);
    const [guideemail, setGuideEmail] = useState(null);
    const [username, setUsername] = useState(null);
    const [useremail, setUserEmail] = useState(null);

    async function fetchDetails(entity, id) {
        const data = await config.getData(entity, null, null, null, null, null, id);
        return data;
    }

    async function toggleSidebar() {
        setSidebarOpen(!sidebarOpen);
        try {
            if (user.role === "user") {
                if (guide_id) {
                    if (guidename == null) {
                        const theguideDetails = await fetchDetails("guide", guide_id);
                      
                        setGuidename(theguideDetails[0].user_name);
                        setGuideEmail(theguideDetails[0].email)
                    }
                }

            }
            if (user.role === "guide") {
                if (username == null) {
                    const theuserDetails = await fetchDetails("users", route.user_id);
                    setUsername(theuserDetails.user_name);
                    setUserEmail(theuserDetails.email)
                }
            }
        } catch (err) {
            throw err;
        }

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

    const routeCoordinates = route.route.map(site => [
        site.latitude, site.longitude
    ]);

    return (
        <div className={`container ${sidebarOpen ? "sidebar-open" : ""}`}>
            <div className={`route-sidebar ${sidebarOpen ? "open" : ""}`}>
                <button className="toggle-button" onClick={toggleSidebar}>
                    {sidebarOpen ? "less details" : "more details"}
                </button>
                {console.log("guide")}
                <div className="trip details">
                    {/* {user.role === "user"?():}   */}

                    {user.role === "user" ? (<>  {guide_id ? (
                        <p>
                            Your guide: {guidename}
                            <br></br>
                            conect to your guide with email:  {guideemail}
                            <br />
                            Date of trip: {trip_date}
                        </p>
                    ) : (
                        <p>
                            Your guide: no guide
                            <br />
                            Date of trip: no date
                        </p>
                    )}</>) : (<>
                        the traveler name:
                        <br></br>{username}
                        <br></br>
                        the traveler email:
                        <br></br>{useremail}
                    </>)}


                    {route.route.map((currentRoute, index) => (
                        <div className="route-item" key={currentRoute.id}>
                            <div className="circle"></div>
                            <h2 className="site-name">{currentRoute.site_name}</h2>
                            {index < route.route.length - 1 && <div className="dashed-line"></div>}
                        </div>
                    ))}
                </div>
            </div>
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
                            {route.route[index].site_name}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default TripRoute;

