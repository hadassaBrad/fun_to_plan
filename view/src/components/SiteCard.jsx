import React, { useContext, useState } from 'react';
import config from '../config.js';
import { UserContext } from '../App.jsx';
import { Link } from "react-router-dom";
import AdminSite from "./AdminSite.jsx";
import { SlBasketLoaded } from "react-icons/sl";
import { RiDeleteBin5Line } from "react-icons/ri";


import "../css/siteCard.css";

function SiteCard({ site, setSites, sites }) {
    const { user } = useContext(UserContext);
    const [showAdminSite, setShowAdminSite] = useState(false);
    const [siteForUpdate, setSiteForUpdate] = useState();
    let isAdmin = false;
    if (user) {
        isAdmin = user.role === "admin";
    }

    async function addToBasket() {
        const currentSites = JSON.parse(localStorage.getItem("basket")) || [];
        const siteExists = currentSites.some(existingSite => existingSite.id === site.id);

        if (!siteExists) {
            const allSites = [...currentSites, site];
            localStorage.setItem("basket", JSON.stringify(allSites));

            if (user) {
                const body = { site: [site], user: user };
                try {
                    await config.postData("basket", body);
                } catch (error) {
                    console.error("Error fetching site:", error);
                }
            }
        } else {
            console.log("already exist");
        }
    }

    async function deleteSite() {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await config.deleteData("sites", site.id);
                const filteredSites = sites.filter(siteInSites => siteInSites.id !== site.id);
                setSites(filteredSites);
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function onClickSave(site) {
        try {
            const result = await config.putData("sites", site.id, site);
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
        setSiteForUpdate(currentSite);
        setShowAdminSite(true);
    }

    return (
        <>
            <div className="site-card">
                <h1 className="site-card-title">{site.siteName}</h1>
                <img
                    className="site-card-img"
                    alt={site.siteName}
                    title={site.siteName}
                    src={site.url}
                />
                {isAdmin && <button className="site-card-button" onClick={deleteSite}><RiDeleteBin5Line /></button>}
                {isAdmin && <button className="site-card-button" onClick={updateSite}>UPDATE SITE</button>}
                {(user == null || user.role === "user") && <button className="site-card-button" onClick={addToBasket}><SlBasketLoaded />                </button>}
                <Link className="site-card-link" to={`/home/sites/${site.id}`}>Learn More</Link>
            </div>
            {showAdminSite && <AdminSite onClickSave={onClickSave} site={siteForUpdate} setSite={setSiteForUpdate} onClose={() => setShowAdminSite(false)} />}
        </>
    );
}

export default SiteCard;
