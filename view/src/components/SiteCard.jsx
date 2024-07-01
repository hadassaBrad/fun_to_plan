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
            console.log("current sites");
            console.log(currentSites);
            const allSites = [...currentSites, site];
            const siteExists = currentSites.some(existingSite => existingSite.id === site.id);
            if (!siteExists) {
                localStorage.setItem("basket", JSON.stringify(allSites));

            } else {
                console.log("already exist");
            }
        } else {
            localStorage.setItem("basket", JSON.stringify([site]));
        }
        if (user) {
            console.log("in basket");
            //  const body = { data: [{ userid: user.id, siteId: site.id }] };
            const body = {
                site: [site],
                user: user
            }
            console.log("addToBasket ", body);
            try {
                await config.postData("basket", body);
            } catch (error) {
                console.error("Error fetching site:", error);
            }
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

    async function onClickSave(site) {
        try {
            console.log("in click save:  " + site)

            const result = await config.putData("sites", site.id, site)
            console.log("result of site card")
            console.log(result);
            const filteredSites = sites.filter(siteInSites => siteInSites.id !== site.id);
            setSites([...filteredSites, result]);
            return result;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function updateSite() {
        const currentSite = await config.getData("sites", [], [], null, null, site.id);
        console.log(currentSite);
        setSiteForUpdate(currentSite);
        console.log(siteForUpdate);
        setShowAdminSite(true);
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
            {console.log(site)}
            <h1>{site.siteName}</h1>
            <img

                alt={site.siteName}
                title={site.siteName} // Setting the title attribute to display the name on hover
                src={site.url}
                height={100} width={180}
            />
            {isAdmin && 
            <button onClick={deleteSite}>✖️</button>
            }
            {isAdmin && <button onClick={updateSite}>UPDATE SITE</button>}
            {console.log(site)}


            {(user == null || user.role == "user") && <button onClick={addToBasket}>add to basket</button>}
            <Link className="nav-link" to={`/home/sites/${site.id}`}>Learn More</Link>
            {console.log(site)}

            {showAdminSite && <AdminSite onClickSave={onClickSave} site={siteForUpdate} setSite={setSiteForUpdate} onClose={() => setShowAdminSite(false)} />}
        </>
    );
}


export default SiteCard;