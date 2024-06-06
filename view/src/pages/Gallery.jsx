import React from "react";
import {  useState, useEffect } from 'react';
import  config  from '../config';
// import { useParams } from 'react-router-dom'
// import InfiniteScroll from 'react-infinite-scroll-component';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../App';
// import { BsPlusLg } from "react-icons/bs";

// function Gallery() {

//     const [photos, setPhotos] = useState([]);

    // useEffect(() => {
    //     setPhotos(config.getData("photos"));
    // }, []);

    // return (
    //     <>
    //         {photos.map((photo) => (
    //             <img src={photo.url} />
    //         ))}
    //     </>
    // );
    function Gallery() {
        const [photos, setPhotos] = useState([]);
    
        useEffect(() => {
            const fetchPhotos = async () => {
                try {
                    const data = await config.getData("photos");
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
                        <img key={photo.id} src={photo.url} alt={photo.title} />
                    ))
                ) : (
                    <p>No photos available</p>
                )}
            </>
        );
}
export default Gallery;