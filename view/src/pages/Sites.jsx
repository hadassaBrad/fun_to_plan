import React, { useState, useEffect, useContext } from "react";
import SiteCard from '../components/SiteCard';
import Header from "../components/Header.jsx";
import { UserContext } from '../App.jsx';
import config from '../config';

function Sites() {
    const { user, setUser } = useContext(UserContext);
    const [areaFilter, setAreaFilter] = useState("");
    const [hoursFilter, setHoursFilter] = useState("");
    const [paymentFilter, setPaymentFilter] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("");
    const [agesFilter, setAgesFilter] = useState("");
    const [sites, setSites] = useState([]);
    const [begin, setBegin] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchSites = async () => {
            try {
                console.log(sites);
                console.log("fetching data of sites... ");
                const data = await config.getData("sites", [], [], begin, limit);
                console.log(data);
                if (sites.length === 0) {
                    setSites([...data]);
                }
                else {
                    setSites(sites => [...sites, ...data]);
                }
                console.log(sites);
            } catch (error) {
                console.error("Error fetching sites:", error);
            }
        };

        fetchSites();
    }, [begin]);

    function handleMoreSitesBtn() {
        setBegin(begin => begin + 10);
    }

    return (
        <div>
            {console.log(sites)}
            {sites.length > 0 ? (
                <>
                    <h1>search by</h1>
                    <div className="site-cards-container">
                        {
                            sites.map(site => (
                                <SiteCard
                                    key={site.id}
                                    site={site}
                                    setSites={setSites}
                                    sites={sites}
                                />
                            ))
                        }
                    </div>
                </>
            ) : (
                <p>No sites available</p>
            )}
            <br />
            <button onClick={handleMoreSitesBtn}>more sites</button>
        </div>
    );
}

export default Sites;






// import React, { useState, useEffect, useContext } from "react";
// import SiteCard from '../components/SiteCard';
// import Header from "../components/Header.jsx";
// import { UserContext } from '../App.jsx';
// import config from '../config';

// function Sites() {
//     const { user, setUser } = useContext(UserContext);
//     const [areaFilter, setAreaFilter] = useState("");
//     const [hoursFilter, setHoursFilter] = useState("");
//     const [paymentFilter, setPaymentFilter] = useState("");
//     const [difficultyFilter, setDifficultyFilter] = useState("");
//     const [agesFilter, setAgesFilter] = useState("");
//     const [sites, setSites] = useState([]);
//     const [begin, setBegin] = useState(0);
//     const limit = 10;

//     useEffect(() => {
//         const fetchSites = async () => {
//             try {
//                 console.log(sites);
//                 console.log("fetching data of sites... ");
//                 const filters = { area: areaFilter, hours: hoursFilter, payment: paymentFilter, difficulty: difficultyFilter, ages: agesFilter };
//                 const data = await config.getData("sites", filters, [], begin, limit);
//                 console.log(data);
//                 if (sites.length === 0) {
//                     setSites([...data]);
//                 } else {
//                     setSites(sites => [...sites, ...data]);
//                 }
//                 console.log(sites);
//             } catch (error) {
//                 console.error("Error fetching sites:", error);
//             }
//         };

//         fetchSites();
//     }, [begin, areaFilter, hoursFilter, paymentFilter, difficultyFilter, agesFilter]);

//     function handleMoreSitesBtn() {
//         setBegin(begin => begin + 10);
//     }

//     return (
//         <div>
//             {console.log(sites)}
//             <h1>Search by:</h1>
//             <div className="filters">
//                 {/* Add your filter components here */}
//             </div>
            
//             {sites.length > 0 ? (
//                 <>
//                     <div className="site-cards-container">
//                         {sites.map(site => (
//                             <SiteCard
//                                 key={site.id}
//                                 site={site}
//                                 setSites={setSites}
//                                 sites={sites}
//                             />
//                         ))}
//                     </div>
//                 </>
//             ) : (
//                 <p>No sites available</p>
//             )}
//             <br />
//             <button onClick={handleMoreSitesBtn}>Load More Sites</button>
//         </div>
//     );
// }

// export default Sites;



// import React, { useState, useEffect } from 'react';

// const Sites = () => {
//     const [sites, setSites] = useState([]);
//     const [areas, setAreas] = useState([]);
//     const [hours, setHours] = useState([]);
//     const [payment, setPayment] = useState([]);
//     const [difficulty, setDifficulty] = useState([]);
//     const [ages, setAges] = useState([]);

//     const [filters, setFilters] = useState({
//         area: '',
//         hour: '',
//         payment: '',
//         difficulty: '',
//         age: ''
//     });

//     const fetchSites = async () => {
//         const { area, hour, payment, difficulty, age } = filters;
//         const searchKey = ['area', 'hour', 'payment', 'difficulty', 'age'];
//         const searchValue = [area, hour, payment, difficulty, age];
//         const newData = await getData('sites', searchKey, searchValue);
//         setSites(newData);
//     };

//     useEffect(() => {
//         fetchSites();
//     }, [filters]);

//     const handleMoreSitesBtn = () => {
//         // Logic to fetch more sites
//     };

//     return (
//         <div className="sites-container">
//             <div className="filters">
//                 {/* Add filter components here */}
//             </div>
//             {sites.map((site) => (
//                 <div key={site.id}>
//                     <h3>{site.name}</h3>
//                     <p>{site.description}</p>
//                 </div>
//             ))}
//             <button onClick={handleMoreSitesBtn}>Load More Sites</button>
//         </div>
//     );
// }

// export default Sites;
