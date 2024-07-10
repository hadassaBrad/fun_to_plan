import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/home.css";

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };


    return (
        
        <>
   <img className="img" src="/images/7a60f8a1cec5946cd5b978ec2841bf80.jpg" alt="img1" />
              
        
        </>
      
    );
}

export default Home;
