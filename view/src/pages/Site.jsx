import React from "react";

function Site() {
    return (
        <>
            <h1>{site.name}</h1>
            <h2>level:{site.level}</h2>

            <h2>url:{site.url}</h2>

            <button>add to basket</button>

        </>
    );
}
export default Site;