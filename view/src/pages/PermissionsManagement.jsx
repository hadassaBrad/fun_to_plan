
import React, { useContext, useState, useEffect } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import BasketCard from '../components/BasketCard.jsx';
import UserComponent from '../components/UserComponent.jsx';
function PermissionsManagement () {
    const [guides,setGuides]=useState([]);
    useEffect(() => {
        async function fetchData() {
       
             try {
                  
                    const data = await config.getData("users", null, null, null, null, null, 4); // Example fetch function, adjust as needed
                 console.log("the guides that wating: ");
                 console.log(data);
                    setGuides(data);
                } catch (error) {
                    console.error("Error fetching data from DB:", error);
                }
            
        }

        fetchData();
    }, []);

    return (
        <>
        {   guides.map(guide => (
          <UserComponent
         name={guide.user_name}// Setting the title attribute to display the name on hover
            email={guide.email}
            role={guide.role.name}
            
          />))}
        </>
    );
}
export default PermissionsManagement;