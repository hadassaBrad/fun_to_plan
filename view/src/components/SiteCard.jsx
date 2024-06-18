import React from "react";
// import Site from "./Site";
import { useContext, useState } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import { Link } from "react-router-dom";
import AdminSite from "./AdminSite.jsx";

function SiteCard({ site, setSites, sites }) {
    const { user, setUser } = useContext(UserContext);
    const [showAdminSite, setShowAdminSite] = useState(false);
    const [siteForUpdate, setSiteForUpdate] = useState();
    let isAdmin = false;
    if (user) {
        isAdmin = user.role === "admin";
    };

    async function addToBasket() {
        if (localStorage.getItem("basket")) {
            const currentSites = JSON.parse(localStorage.getItem("basket"));
            const allSites = [...currentSites, site];
            const siteExists = currentSites.some(existingSite => existingSite.id === site.id);
            if (!siteExists) {
                localStorage.setItem("basket", JSON.stringify(allSites));
                if (user) {
                    const body = { userid: user.id, siteId: site.id };
                    try {
                        await config.postData("basket", body);
                    } catch (error) {
                        console.error("Error fetching site:", error);
                    }
                }
            } else {
                console.log("already exist");
            }
        } else {
            localStorage.setItem("basket", JSON.stringify([site]));
        }
    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

    async function deleteSite() {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await config.deleteData("sites", site.id);
                //deleting the site from the array of sites...
                const filteredSites = sites.filter(siteInSites => siteInSites.id !== site.id);
                setSites(filteredSites);
            }
            catch (err) {
                console.log(err);
            }
        }
    }

    async function updateSite() {

        const currentSite = await config.getData("sites", null, null, null, null, site.id);
        setSiteForUpdate(currentSite);
        setShowAdminSite(true);

        // if (window.confirm('Are you sure you want to update this item?')) {
        //     try {
        //         const updatedSite=  await config.putData("sites", site.id, site);
        //         //deleting the site from the array of sites...
        //         const filteredSites = sites.filter(siteInSites => siteInSites.id !== site.id);
        //         setSites([...filteredSites, updatedSite]);
        //     }
        //     catch (err) {
        //         console.log(err);
        //     }
        // }
    }

    return (
        <>
            <h1>{site.site_name}</h1>

            <img

                alt={site.site_name}
                title={site.site_name} // Setting the title attribute to display the name on hover
                src={site.url}
                height={100} width={180}
            />
            {isAdmin && <button onClick={deleteSite}>✖️</button>}
            {isAdmin && <button onClick={updateSite}>UPDATE SITE</button>}


            <button onClick={addToBasket}>add to basket</button>
            <Link className="nav-link" to={`/home/sites/${site.id}`}>Learn More</Link>
            {console.log(siteForUpdate)}
            {showAdminSite && <AdminSite site={siteForUpdate} setSite={setSiteForUpdate} onClose={() => setShowAdminSite(false)} />}
        </>
    );
}


export default SiteCard;