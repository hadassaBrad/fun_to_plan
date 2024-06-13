import React from "react";
// import Site from "./Site";
import { useState, useEfect, useContext } from "react";
import { UserContext } from '../App.jsx';
function BasketCard({ site }) {
    const { user, setUser } = useContext(UserContext);

    async function removeFromBasket() {
        if (user) {
            //fetch, make render
        }
        else {

            const siteIdToRemove = site.id;
            const currentSites = JSON.parse(localStorage.getItem("basket")) || [];
            const updatedSites = currentSites.filter(site => site.id !== siteIdToRemove);
            localStorage.setItem("basket", JSON.stringify(updatedSites));

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
            <button onClick={removeFromBasket}>remove From Basket</button>

        </>
    );

}

export default BasketCard;