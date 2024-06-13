import React from "react";
import { useState, useEffect } from 'react';
import config from '../config';

function Gallery() {
    const [photos, setPhotos] = useState([]);
    const [begin, setBegin] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                console.log("fetching data of gallery... ");
                const data = await config.getData("gallery", null, null, begin, limit);
                console.log(data);
                console.log(photos);
                if(photos.length===0)
                    {
                        setPhotos(data);
                    }
                    else{
                                        setPhotos(photos => [...photos, ...data]);

                    }
                console.log(photos);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchPhotos();
    }, [begin]);


    function handleMorePhotosBtn() {
        setBegin(begin => begin + 10);
    }

    return (
        <>
        {console.log(photos)
        
        }
            {photos.length > 0 ? (
                // photos.map((photo) => (
                //     <img key={photo.id} src={photo.url} alt={photo.title} height={100} width={180} />
                // )
            
                photos.map(photo => (
                    <img
                        key={photo.id}
                        src={photo.url}
                        alt={photo.name}
                        title={photo.name} // Setting the title attribute to display the name on hover
                        height={100} width={180}
                    />
                )
            )
            ) : (
                <p>No photos available</p>
            )}
            <br />
            <button onClick={handleMorePhotosBtn}>more photos</button>
        </>
    );
}
export default Gallery;