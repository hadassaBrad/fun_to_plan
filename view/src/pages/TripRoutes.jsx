
import React from "react";
import { useEffect } from "react";
function TripRoutes() {
    useEffect(() => {
        const fetchTrips = async () => {
            try {
          
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchTrips();
    }, );

    return (
        <></>
    );
}
export default TripRoutes;