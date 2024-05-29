import React from "react";
// import Site from "./Site";

function Site({ key, url, name }) {
    return (
        <>
            <h1>{name}</h1>
            <img src={url} alt={name} />
        </>
    );
}

export default Site;