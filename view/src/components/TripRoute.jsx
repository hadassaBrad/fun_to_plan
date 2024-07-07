import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
 import '../css/trioRoutes.css'; // ייבוא קובץ ה-CSS
import L from "leaflet";

function TripRoute({ route }) {
    const mapRef = useRef();

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;
            map.fitBounds(route);
        }
    }, [route]);

    return (
        <div>
       <MapContainer className="map-container"
       
                center={[31.0461, 34.8516]}
                zoom={8}
                scrollWheelZoom={true}
   
                ref={mapRef}>
             
            
            </MapContainer>
        </div>
    );
}

export default TripRoute;
