import React, { useContext, useState, useEffect } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import BasketCard from '../components/BasketCard.jsx';

//?user_id=${user.id}
function Basket() {
    const { user } = useContext(UserContext);
    const [sites, setSites] = useState([]);

    useEffect(() => {
        async function fetchData() {
            if (user) {
                // Fetch data from DB based on user
                // try {
                //     const data = await config.getData("basket", null, null, 0, 10); // Example fetch function, adjust as needed
                //     setSites(data);
                // } catch (error) {
                //     console.error("Error fetching data from DB:", error);
                // }
            } else {
                const currentSites = JSON.parse(localStorage.getItem("basket"));
                setSites(currentSites || []);
            }
        }

        fetchData();
    }, [user]);

    return (
        <div>
            {sites.length > 0 ? (
                sites.map(site => (
                    <BasketCard key={site.id} site={site} />
                ))
            ) : (
                <p>No items in the basket</p>
            )}
        </div>
    );
}

export default Basket;





// import { useContext, useState } from 'react';
// import config from '../config.js';
// import { UserContext } from '../App.jsx';
// import BasketCard from '../components/BasketCard.jsx';
// function Basket() {
//     const { user, setUser } = useContext(UserContext);
//     const [sites, setSites]=useState("");
//     if(user!=""){
// //const currentSites= fetch the data from DB
// //setSites(currentSites);

//     }
//    else{
//     const currentSites=JSON.parse(localStorage.getItem("basket"));
//     setSites(currentSites);
//    }

//     return (
//         <>
//           {   sites.map(site => (
//                     <BasketCard
//                     site={site}
//                     />
//                 ))}
//         </>
//     );
        
// }

// export default Basket;