import React from "react";
import config from '../config.js';
import { useEffect } from "react";
import { Routes, Route, useParams } from 'react-router-dom';

 function Site({ }) {
    const { siteId } = useParams();
    
    useEffect(() => {
        const fetchSite = async () => {
            try {
                console.log("fetching data of site... "+ siteId);
                const data = await config.getData("sites", null, null, null,null,siteId);
                console.log("data in specific site "+data.id);
                
                // if(photos.length===0)
                //     {
                //         setPhotos(data);
                //     }
                //     else{
                //                         setPhotos(photos => [...photos, ...data]);

                //     }
                // console.log(photos);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchSite();
    },[siteId]);


    return (
        <>{
            
        }
        {/* <h1>{data.name} </h1> */}
           hi
        </>
    );
}
export default Site;