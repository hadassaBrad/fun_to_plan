import React from "react";
import Site from '../components/Site'
import SignUp from "../components/SignUp";

function Sites() {

    const sites = [{ id: 5, name: "first", url: "https://www.google.com/imgres?q=SEA&imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2Fa%2Fa7%2FAtlantic_near_Faroe_Islands.jpg&imgrefurl=https%3A%2F%2Fen.wikipedia.org%2Fwiki%2FSea&docid=PEBjMp743j0etM&tbnid=3tKGS1mhc5tzoM&vet=12ahUKEwjslJTR2qmGAxVsSEEAHSRgA5AQM3oECBoQAA..i&w=4385&h=2900&hcb=2&ved=2ahUKEwjslJTR2qmGAxVsSEEAHSRgA5AQM3oECBoQAA" },
    { id: 6, name: "second", url: "https://www.kayak.co.uk/news/most-beautiful-places-photograph-in-the-world/" },
    { id: 8, name: "third", url: "https://travelphotodiscovery.com/most-beautiful-places-in-the-world-to-photograph/" }];

    return (
        <>
        {/* <SignUp /> */}
            {sites.map(site => {
                return <Site
                    key={site.id}
                    url={site.url}
                    name={site.name}
                />
            })}
        </>
    );
}
export default Sites;