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
