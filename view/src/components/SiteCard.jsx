import React from "react";
// import Site from "./Site";

function SiteCard({ key, url, name }) {
    return (
        <>
            <h1>{name}</h1>
            <img src={url} alt={name} />
            <button onClick={() => window.location.href = `/site/${site.id}`}>
        קרא עוד
      </button>
        </>
    );
}

export default SiteCard;