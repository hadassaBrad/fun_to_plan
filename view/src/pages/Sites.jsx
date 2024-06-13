import React from "react";
import SiteCard from '../components/SiteCard'
import Header from "../components/Header.jsx";
import { useState,useContext,useEffect } from "react";
import { UserContext } from '../App.jsx';

function Sites() {
  const { user, setUser } = useContext(UserContext); 
  const [areafiler,setAreaFilter]=useState("");
  const [hoursfiler,setHoursFilter]=useState("");
  const [paymentfiler,setPaymentFilter]=useState("");
  const [dificultyfiler,setDifcultyFilter]=useState("");
  const [agesFilter,setAgesFilter]=useState("");
  const [photos, setPhotos] = useState([]);
  const [begin, setBegin] = useState(0);
  const limit = 10;

  useEffect(() => {
    const fetchPhotos = async () => {
        try {
            console.log("fetching data of sites... ");
            const data = await config.getData("sites", null, null, begin, limit);
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

return(
        <div>
      
        {console.log(photos)
        
      }
          {photos.length > 0 ? (
              // photos.map((photo) => (
              //     <img key={photo.id} src={photo.url} alt={photo.title} height={100} width={180} />
              // )
          
              photos.map(photo => (
                  <SiteCard
                    photo={photo}// Setting the title attribute to display the name on hover
                      height={100} width={180}
                  />
              )
          )
          ) : (
              <p>No sites available</p>
          )}
          <br />
          <button onClick={handleMorePhotosBtn}>more photos</button>
      
     
        <button className="plan-route-button">
          קבל תכנון מסלול
        </button>
      </div>
    );
}
export default Sites;