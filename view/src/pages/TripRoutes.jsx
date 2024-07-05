
import React, { useState, useContext } from "react";
import { useEffect } from "react";
import TripRoute from '../pages/TripRoute'
import config from "../config";
import { UserContext } from '../App.jsx';
function TripRoutes() {
    const [tripRoutes, setTripRoutes] = useState([]);
    const { user } = useContext(UserContext);
    const [loadingData, setLoadingData] = useState(true);
    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setLoadingData(true);
                let data = null;
                if (user.role == "user") {
                    data = await config.getData('trips', ["user_id"], [user.id], null, null, null, null); // Example fetch function, adjust as needed

                }
                if (user.role == "guide") {
                    data = await config.getData('trips', ["guide_id"], [user.id], null, null, null, null); // Example fetch function, adjust as needed

                }
                if (data) {
                    setTripRoutes(data);
                    setLoadingData(false);
                    console.log('the trips: ');
                    console.log(data);
                }
                else {
                    throw new Eroor("this permission can not get any trip routes");
                }

            } catch (error) {
                console.error('Error fetching data from DB:', error);
            }

        };

        fetchTrips();
    }, []);

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




