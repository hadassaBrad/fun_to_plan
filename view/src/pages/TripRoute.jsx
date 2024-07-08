import React, { useEffect, useRef, useState } from "react";
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import '../css/tripRoutePage.css'; // Import CSS

function TripRoute() {
    const location = useLocation();
    console.log("location.state");
    console.log(location);
    const { route } = location.state.route || {};
    const { guide_id } = location.state.guide_id || {};
    const { trip_date } = location.state.trip_date || {};
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
            <div className={`route-sidebar ${sidebarOpen ? "open" : ""}`}>
                <button className="toggle-button" onClick={toggleSidebar}>
                    {sidebarOpen ? "less details" : "more details"}
                </button>
                {console.log("guide")}
                <div className="trip details">
                    {guide_id ? (
                        <p>
                            Your guide: {guide_id}
                            <br />
                            Date of trip: {trip_date}
                        </p>
                    ) : (
                        <p>
                            Your guide: no guide
                            <br />
                            Date of trip: no date
                        </p>
                    )}
                    {route.map((currentRoute, index) => (
                        <div className="route-item" key={currentRoute.id}>
                            <div className="circle"></div>
                            <h2 className="site-name">{currentRoute.site_name}</h2>
                            {index < route.length - 1 && <div className="dashed-line"></div>}
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
                          {route[index].site_name}
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default TripRoute;

