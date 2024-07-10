import React, { useState, useEffect } from 'react';
import config from '../config';
import "../css/galery.css";

function Gallery() {
    const [photos, setPhotos] = useState([]);
    const [begin, setBegin] = useState(0);
    const limit = 10;

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const data = await config.getData("gallery", [], [], begin, limit);
                setPhotos(photos => [...photos, ...data]);
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
        <div className="gallery-container">
            {photos.length > 0 ? (
                photos.map(photo => (
                    <div className="gallery-item" key={photo.id}>
                        <img
                            src={photo.url}
                            alt={photo.name}
                            title={photo.name}
                            height={100}
                            width={180}
                        />
                        <div className="photo-name">{photo.name}</div>
                    </div>
                ))
            ) : (
                <p>No photos available</p>
            )}
        </div>
    );
}

export default Gallery;

