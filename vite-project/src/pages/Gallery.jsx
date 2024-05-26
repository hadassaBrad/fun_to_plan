import React from "react";
import { useServer } from "../components/Server";

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