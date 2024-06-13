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
        const data = await config.getData("sites", null, null, begin, limit);
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
      {console.log(sites)
      }
      {sites.length > 0 ? (
        // sites.map((photo) => (
        //     <img key={photo.id} src={photo.url} alt={photo.title} height={100} width={180} />
        // )
      
        sites.map(site => (
          <SiteCard
            site={site}// Setting the title attribute to display the name on hover
            height={100} width={180}
          />
        )
        )
      ) : (
        <p>No sites available</p>
      )}
      <br />
      <button onClick={handleMoresitesBtn}>more sites</button>


      <button className="plan-route-button">
        קבל תכנון מסלול
      </button>
    </div>
  );
}
export default Sites;