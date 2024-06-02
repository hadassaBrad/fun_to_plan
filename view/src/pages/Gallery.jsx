import React from "react";
import { useServer } from "../components/Server";
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { BsPlusLg } from "react-icons/bs";

function Gallery() {

    const { fetchData } = useServer();
    const [photos, setPhotos] = useState([]);

    useEffect(() => {
        setPhotos(fetchData("photos"));
    }, []);

    return (
        <>
            {photos.map((photo) => (
                <img src={photo.url} />
            ))}
        </>
    );
}
export default Gallery;