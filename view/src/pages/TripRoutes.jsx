import React, { useEffect, useContext, useState } from "react";
import "leaflet/dist/leaflet.css";
import config from "../config";
import { UserContext } from '../App';
import TripRoute from "../components/TripRoute";

function TripRoutes() {
    const { user } = useContext(UserContext);
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            let data;

            if (user.role == "user") {
                data = await config.getData("trips", ["user_id"], [user.id]);
            }

            if (user.role == "guide") {
                data = await config.getData("trips", ["guide_id"], [user.id]);
            }
            setRoutes(data);
        };
        fetchRoutes();

    }, [user.id]);

    return (
        <div className="container">
            <h1>Routes</h1>

            {routes.map(route => (
                <div key={route.id}>
                    <TripRoute route={route} />
                </div>
            ))}
        </div>
    );
}

export default TripRoutes;
