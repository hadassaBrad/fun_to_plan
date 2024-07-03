
import React, { useState, useEffect } from 'react';
import config from '../config';

function Gallery() {
    const [photos, setPhotos] = useState([]);
    const [begin, setBegin] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                console.log("fetching data of gallery... ");
                const data = await config.getData("gallery", [], [], begin, limit);
                console.log(data);
                setPhotos(photos => [...photos, ...data]);
                console.log(photos);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchPhotos();
    }, [begin]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
                setBegin(prevBegin => prevBegin + limit);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {photos.length > 0 ? (
                photos.map(photo => (
                    <img
                        key={photo.id}
                        src={photo.url}
                        alt={photo.name}
                        title={photo.name} // Setting the title attribute to display the name on hover
                        height={100}
                        width={180}
                    />
                ))
            ) : (
                <p>No photos available</p>
            )}
        </>
    );
}

export default Gallery;
