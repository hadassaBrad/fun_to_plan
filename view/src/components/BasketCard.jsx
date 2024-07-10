import React, { useContext } from "react";
import config from '../config.js';
import { UserContext } from '../App.jsx';
import '../css/basketCard.css';
function BasketCard({ site, renderSites, className }) {
    const { user } = useContext(UserContext);

    async function removeFromBasket() {
        const siteIdToRemove = site.id;
        const currentSites = JSON.parse(localStorage.getItem("basket")) || [];
        const updatedSites = currentSites.filter(site => site.id !== siteIdToRemove);
        localStorage.setItem("basket", JSON.stringify(updatedSites));

        if (user) {

            await config.deleteData("basket", site.site_id, user.id);
        }

        if (updatedSites.length === 0) {
            localStorage.removeItem("basket");
        }

        renderSites();
    }

    return (
        <div className={`basket-card ${className}`}>
            <h2>{site.site_name}</h2>
            <img
                className="basket-card-img"
                alt={site.site_name}

                src={site.url}
            />
            <div className="basket-card-content">

                <button className="basket-card-button" onClick={removeFromBasket}>
                    Remove From Basket
                </button>
            </div>
        </div>
    );
}

export default BasketCard;
