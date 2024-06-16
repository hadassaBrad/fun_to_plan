import React from "react";
import config from '../config.js';
import { useState, useEfect, useContext } from "react";
import { UserContext } from '../App.jsx';
function BasketCard({ site }) {
    const { user, setUser } = useContext(UserContext);
    const {renderBasket,setRenderBasket}=useState(false)
    async function removeFromBasket() {

        if (user) {
          
     await config.deleteData("basket", site.site_id, user.id);
        }
        else {

            const siteIdToRemove = site.id;
            const currentSites = JSON.parse(localStorage.getItem("basket")) || [];
            const updatedSites = currentSites.filter(site => site.id !== siteIdToRemove);
            localStorage.setItem("basket", JSON.stringify(updatedSites));

        }
       // setRenderBasket(!renderBasket) ;
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