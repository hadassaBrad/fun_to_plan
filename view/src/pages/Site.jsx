import React, { useEffect, useState } from "react";
import config from '../config.js';
import { useParams } from 'react-router-dom';
import '../css/singleSite.css'; 

function Site() {
    const { siteId } = useParams();
    const [site, setSite] = useState(null);

    useEffect(() => {
        const fetchSite = async () => {
            try {
                console.log("fetching data of site... " + siteId);
                const data = await config.getData("sites", [], [], null, null, siteId);
                setSite(data);
                console.log("data in specific site " + data.id);
            } catch (error) {
                console.error("Error fetching site data:", error);
            }
        };

        fetchSite();
    }, [siteId]);

    if (!site) {
        return <div>Loading...</div>;
    }

    return (
        <div className="site-container">
            <h2>Name:</h2>
            <p className="value">{site.siteName}</p>
            <img
                alt={site.site_name}
                title={site.site_name}
                src={site.url}
                height={200}
                width={300}
            />
            <h2>Description:</h2>
            <p className="value">{site.description}</p>
           
            <p   className="value">    Popularity: {site.popularity}</p>
            <h2>Difficulty Level:</h2>
            <p className="value">{site.difficultyLevel}</p>
            <h2>Area:</h2>
            <p className="value">{site.area}</p>
            <h2>Price:</h2>
            <p className="value">{site.price}</p>
            <h2>Age Range:</h2>
            <p className="value">{site.age}</p>
            <h2>Opening Hour:</h2>
            <p className="value">{site.openingHour}</p>
            <h2>Closing Hour:</h2>
            <p className="value">{site.closingHour}</p>
            <h2>Track Length:</h2>
            <p className="value">{site. trackLength}</p>
        </div>
    );
}

export default Site;
