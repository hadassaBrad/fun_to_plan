import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
 import '../css/trioRoutes.css'; // ייבוא קובץ ה-CSS
import L from "leaflet";

function TripRoute({ route }) {
    const mapRef = useRef();

    // const routeCoordinates = route.route.map(site => [
    //     site.latitude, site.longitude
    // ]);

    const routeCoordinates =[[33.439302541984986, 35.86056295749576],[32.96783204488471, 35.72250248668257],
    [31.782982805226748, 35.23028941562683],[31.79606441203283, 35.19880437418395]]

    useEffect(() => {
        if (mapRef.current) {
            const map = mapRef.current;
            map.fitBounds(routeCoordinates);
        }
    }, [routeCoordinates]);

    return (
        <div>
       <MapContainer className="map-container"
       
                center={[31.0461, 34.8516]}
                zoom={8}
                scrollWheelZoom={true}
   
                ref={mapRef}
            >
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
