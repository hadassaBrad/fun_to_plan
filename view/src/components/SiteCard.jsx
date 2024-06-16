import React from "react";
// import Site from "./Site";
import { useContext, useState } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import { Link } from "react-router-dom";

function SiteCard({ site, setSites, sites }) {
    const { user, setUser } = useContext(UserContext);
    let isAdmin = false;
    if (user) {
        isAdmin = user.role === "admin";
    };

    async function addToBasket() {

        if (user) {
            const body = {
                userid: user.id,
                siteId: site.id
            };

            try {
                const data = await config.postData("basket", body);
            } catch (error) {
                console.error("Error fetching site:", error);
            }
        }

        else {
            if (localStorage.getItem("basket")) {
                const currentSites = JSON.parse(localStorage.getItem("basket"));
                const allSites = [...currentSites, site];
                const siteExists = currentSites.some(existingSite => existingSite.id === site.id);
                if (!siteExists)
                    localStorage.setItem("basket", JSON.stringify(allSites))
                else
                    console.log("already exist");

            }
            else {
                console.log(" in else " + JSON.stringify(site));
                localStorage.setItem("basket", JSON.stringify([site]))

            }

        }
    }

    async function deleteSite() {
        if (window.confirm('Are you sure you wish to delete this item?')) {
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

            <button onClick={addToBasket}>add to basket</button>
            <Link className="nav-link" to={`/home/sites/${site.id}`}>Learn More</Link>

        </>
    );
}


export default SiteCard;