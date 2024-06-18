import React, { useContext, useState, useEffect } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import BasketCard from '../components/BasketCard.jsx';
import '../css/basket.css'; // ייבוא קובץ ה-CSS

function Basket() {
    const { user } = useContext(UserContext);
    const [sites, setSites] = useState([]);
    const [renderPage, setRenderPage] = useState(false);

    useEffect(() => {
        async function fetchData() {
            if (user) {
                try {
                    const data = await config.getData("basket", null, null, null, null, null, user.id); // Example fetch function, adjust as needed
                    setSites(data);
                    console.log("the basket: " + data);
                    localStorage.setItem("basket", JSON.stringify(data));
                } catch (error) {
                    console.error("Error fetching data from DB:", error);
                }
            } else {
                const currentSites = JSON.parse(localStorage.getItem("basket"));
                setSites(currentSites || []);
            }
        }

        fetchData();
    }, [user, renderPage]);

    function renderSites() {
        setRenderPage(!renderPage);
    }

    return (
        <div className="basket-container">
            {sites.length > 0 ? (
                sites.map(site => (
                    <BasketCard key={site.id} site={site} renderSites={renderSites} className="basket-card" />
                ))
            ) : (
                <p>No items in the basket</p>
            )}
        </div>
    );
}

export default Basket;












// import React, { useContext, useState, useEffect } from 'react';
// import config from '../config.js';
// import { UserContext } from '../App.jsx';
// import BasketCard from '../components/BasketCard.jsx';

// //?user_id=${user.id}
// function Basket() {
//     const { user } = useContext(UserContext);
//     const [sites, setSites] = useState([]);

//     useEffect(() => {
//         async function fetchData() {
//             if (user) {
               
//                  try {
//                 const data = await config.getData("basket", null, null, null, null,null,user.id); // Example fetch function, adjust as needed
//                      setSites(data);
//                  } catch (error) {
//                     console.error("Error fetching data from DB:", error);
//              }
//             } else {
//                 const currentSites = JSON.parse(localStorage.getItem("basket"));
//                 setSites(currentSites || []);
//             }
//         }

//         fetchData();
//     }, [user]);

//     return (
//         <div>
//             {sites.length > 0 ? (
//                 sites.map(site => (
//                     <BasketCard key={site.id} site={site} />
//                 ))
//             ) : (
//                 <p>No items in the basket</p>
//             )}
//         </div>
//     );
// }

// export default Basket;





// // import { useContext, useState } from 'react';
// // import config from '../config.js';
// // import { UserContext } from '../App.jsx';
// // import BasketCard from '../components/BasketCard.jsx';
// // function Basket() {
// //     const { user, setUser } = useContext(UserContext);
// //     const [sites, setSites]=useState("");
// //     if(user!=""){
// // //const currentSites= fetch the data from DB
// // //setSites(currentSites);

// //     }
// //    else{
// //     const currentSites=JSON.parse(localStorage.getItem("basket"));
// //     setSites(currentSites);
// //    }

// //     return (
// //         <>
// //           {   sites.map(site => (
// //                     <BasketCard
// //                     site={site}
// //                     />
// //                 ))}
// //         </>
// //     );
        
// // }

// // export default Basket;