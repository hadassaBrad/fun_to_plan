const express = require("express");
const router = express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const cors = require('cors');
const geneticAlgorithm=require("../services/tripService")
router.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend app URL
    credentials: true
}));

async function buildTripRoute(id,wantsGuide, startPoint, cost, numOfHours) {
    try { 

        const coordinates = await getcoordinates(startPoint); 
        console.log("in controller, coordinates: "+coordinates[0]+" /" +coordinates[1]);
       
       
        if(wantsGuide)
            {
                addGuide(id) ;
            }
    } catch (err) {
        throw err;
    }
}

async function addGuide(id,){

}
async function getcoordinates(startPoint) {
    try {
        const fetch = require('node-fetch');
        startPoint="hakfir 3 givat zeev israel"
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(startPoint)}`;
 
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon } = data[0];
                    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
                    return [lat,lon];
                  
                } else {
                    console.log('Address not found.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

        console.log("in geting the adress .trip controler");
   
    } catch (err) {
        throw err;
    }
}
module.exports = { buildTripRoute,  }