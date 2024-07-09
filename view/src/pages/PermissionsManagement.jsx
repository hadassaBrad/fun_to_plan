import React, { useContext, useState, useEffect } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import UserComponent from '../components/UserComponent.jsx';

function PermissionsManagement() {
    const [guides, setGuides] = useState([]);
    const [hasGuides, setHasGuides] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await config.getData("users", ["role"], [4], null, null, null, ); // Example fetch function, adjust as needed
                console.log("the guides that wating: " + data);
                if (data.length == 0) {
                    setHasGuides(false);
                }
                else {
                    setGuides(data);
                    setHasGuides(true);
                }

            } catch (error) {
                console.log("Error fetching data from DB:", error);
            }
        }
        fetchData();
    }, []);



    return (
        <>
            {hasGuides ? guides.map((guide, index) => (
                <UserComponent
                    key={index}
                    id={guide.id}
                    name={guide.user_name}
                    email={guide.email}
                    role={guide.role_name}
                    guides={guides}
                    setGuides={setGuides}
                    setHasGuides={setHasGuides}
                />
            )) :
                <h1>NO GUIDES WAITING</h1>
            }
        </>
    );
}

export default PermissionsManagement;
