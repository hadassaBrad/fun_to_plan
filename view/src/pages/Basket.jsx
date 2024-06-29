



import React, { useContext, useState, useEffect } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import BasketCard from '../components/BasketCard.jsx';
import CompleteDetailesModal from '../components/CompleteDetailesModal.jsx'
import '../css/basket.css'; // ייבוא קובץ ה-CSS

function Basket() {
    const { user } = useContext(UserContext);
    const [sites, setSites] = useState([]);
    const [renderPage, setRenderPage] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        async function fetchData() {
            if (user) {
             try {
                  
                    const data = await config.getData("basket", null, null, null, null, null, user.id); // Example fetch function, adjust as needed
                    setSites(data);
                    console.log("the basket: " + data);
                    if(data.length>0)
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

    
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

    function renderSites() {
        setRenderPage(!renderPage);
    }

    return (
        <div className="basket-container">
            {sites.length > 0 ? (<>
             {sites.map(site => (
                    <BasketCard key={site.id} site={site} renderSites={renderSites} className="basket-card" />
                ))} 
            <button className="plan-route-button" onClick={openModal}>
              
                <CompleteDetailesModal  isOpen={isModalOpen} onClose={closeModal}/>
        קבל תכנון מסלול
           </button>
           </>
            ) : (<>
                <p>No items in the basket</p><br/>
                <p>When you will add sites to the basket, we'll be able to build you a trip route...</p>
                </>
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