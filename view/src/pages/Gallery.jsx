import React from "react";
import { useState, useEffect } from 'react';
import config from '../config';

function Gallery() {
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await config.getData("gallery");
                console.log(data);
                setPhotos(data);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchPhotos();
    }, []);

    return (
        <>
            {photos.length > 0 ? (
                photos.map((photo) => (
                    <img key={photo.id} src={photo.url} alt={photo.title} height={100} width={180} />
                ))
            ) : (
                <p>No photos available</p>
            )}
            <br />
            <button>more photos</button>
        </>
    );
}
export default Gallery;