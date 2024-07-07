import React, { useEffect, useRef } from "react";
import { useLocation } from 'react-router-dom';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import '../css/trioRoutes.css'; // ייבוא קובץ ה-CSS
import L from "leaflet";

function TripRoute() {
    const location = useLocation();
    const { route } = location.state || {};
    const mapRef = useRef();
    console.log(route);

    if (!route) {
        return <div>Loading...</div>;
    }
    const routeCoordinates = route.route.map(site => [
        site.latitude, site.longitude
    ]);

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;
            map.fitBounds(routeCoordinates);
        }
    }, [routeCoordinates]);

    return (
        <div className="container">
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
        </div>
    );
}

export default TripRoute;
