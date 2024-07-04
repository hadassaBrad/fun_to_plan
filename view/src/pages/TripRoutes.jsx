
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import TripRoute from '../pages/TripRoute'
import config from "../config";
import { UserContext } from '../App.jsx';
function TripRoutes() {
    const [tripRoutes, setTripRoutes] = useState([]);
    const { user } = useContext(UserContext);
    const [loadingData, setLoadingData]=useState(true);
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoadingData(true)
                const data = await config.getData('trips', null, null, null, null, null, user.id); // Example fetch function, adjust as needed
                setTripRoutes(data);
                setLoadingData(false);
                console.log('the trips: ' );
console.log(data);
            } catch (error) {
                console.error('Error fetching data from DB:', error);
            }

        };

        fetchTrips();
    },[]);

    return (
        <>
            {loadingData ? (
                <h1>loading routes...</h1>
            ) : (
                tripRoutes.map(route => (
                    <TripRoute key={route.id} route={route} />
                ))
            )}
        </>
    );
    
}
export default TripRoutes;




