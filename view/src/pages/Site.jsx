import React from "react";

function Site({ site }) {
    return (
        <>
            <h1>{site.site_name}</h1>
            <h2>url:{site.url}</h2>
            <button>add to basket</button>

        </>
    );
}
export default Site;