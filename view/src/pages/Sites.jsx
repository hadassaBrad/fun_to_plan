import React from "react";
import SiteCard from '../components/SiteCard'
import Header from "../components/Header.jsx";
import { useState, useContext, useEffect } from "react";
import { UserContext } from '../App.jsx';
import config from '../config';

function Sites() {
  const { user, setUser } = useContext(UserContext);
  const [areafiler, setAreaFilter] = useState("");
  const [hoursfiler, setHoursFilter] = useState("");
  const [paymentfiler, setPaymentFilter] = useState("");
  const [dificultyfiler, setDifcultyFilter] = useState("");
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

  function handleMoresitesBtn() {
    setBegin(begin => begin + 10);
  }

  return (
    <div>
      {console.log(sites)}
      {sites.length > 0 ? (
        <>
        <h1>search by</h1>
        
        {
        sites.map(site => (
          <SiteCard
            site={site}// Setting the title attribute to display the name on hover
            height={100} width={180}
            setSites={setSites}
            sites={sites}
          />
        )
        )}</>
      ) : (
        <p>No sites available</p>
      )}
      <br />
      <button onClick={handleMoresitesBtn}>more sites</button>


    </div>
  );
}
export default Sites;


















// import React from "react";
// import SiteCard from '../components/SiteCard'
// import Header from "../components/Header.jsx";
// import { useState, useContext, useEffect } from "react";
// import { UserContext } from '../App.jsx';
// import config from '../config';

// function Sites() {
//   const { user, setUser } = useContext(UserContext);
//   const [areafiler, setAreaFilter] = useState("");
//   const [hoursfiler, setHoursFilter] = useState("");
//   const [paymentfiler, setPaymentFilter] = useState("");
//   const [dificultyfiler, setDifcultyFilter] = useState("");
//   const [agesFilter, setAgesFilter] = useState("");
//   const [sites, setSites] = useState([]);
//   const [begin, setBegin] = useState(0);
//   const limit = 10;

//   useEffect(() => {
//     const fetchSites = async () => {
//       try {
//         console.log(sites);
//         console.log("fetching data of sites... ");
//         const data = await config.getData("sites", [], [], begin, limit);
//         console.log(data);
//         if (sites.length === 0) {
//           setSites([...data]);
//         }
//         else {
//           setSites(sites => [...sites, ...data]);

//         }
//         console.log(sites);
//       } catch (error) {
//         console.error("Error fetching sites:", error);
//       }
//     };

//     fetchSites();
//   }, [begin]);

//   function handleMoresitesBtn() {
//     setBegin(begin => begin + 10);
//   }

// //   return (
// //     <div>
// //       {console.log(sites)}
// //       {sites.length > 0 ? (
// //         <>
// //         <h1>search by</h1>
        
// //         {
// //         sites.map(site => (
// //           <SiteCard
// //             site={site}// Setting the title attribute to display the name on hover
// //             height={100} width={180}
// //             setSites={setSites}
// //             sites={sites}
// //           />
// //         )
// //         )}</>
// //       ) : (
// //         <p>No sites available</p>
// //       )}
// //       <br />
// //       <button onClick={handleMoresitesBtn}>more sites</button>


// //     </div>
// //   );
// // }

//   return (
//     <div>
//       <h1>Filter by:</h1>
      
//       {/* Area Filter Dropdown */}
//       <select onChange={(e) => setAreaFilter(e.target.value)}>
//         <option value="">Select Area</option>
//         {/* Add options for different areas */}
//       </select>

//       {/* Hours Filter Input */}
//       <input type="text" placeholder="Filter by Hours" value={hoursFilter} onChange={(e) => setHoursFilter(e.target.value)} />

//       {/* Payment Filter Dropdown */}
//       <select onChange={(e) => setPaymentFilter(e.target.value)}>
//         <option value="">Select Payment Method</option>
//         {/* Add options for different payment methods */}
//       </select>

//       {/* Difficulty Filter Dropdown */}
//       <select onChange={(e) => setDifficultyFilter(e.target.value)}>
//         <option value="">Select Difficulty Level</option>
//         {/* Add options for different difficulty levels */}
//       </select>

//       {/* Ages Filter Input */}
//       <input type="text" placeholder="Filter by Ages" value={agesFilter} onChange={(e) => setAgesFilter(e.target.value)} />

//       <br />
//       <button onClick={handleFilter}>Apply Filters</button>

//       {/* Display sites based on filters */}
//       {sites.length > 0 ? (
//         <>
//           {sites.map(site => (
//             <SiteCard
//               key={site.id}
//               site={site}
//               height={100}
//               width={180}
//               setSites={setSites}
//               sites={sites}
//             />
//           ))}
//         </>
//       ) : (
//         <p>No sites available</p>
//       )}

//       <br />
//       <button onClick={handleMoresitesBtn}>More Sites</button>
//     </div>
//   );
// };

// export default Sites;