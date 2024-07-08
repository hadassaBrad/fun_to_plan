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
        <Slider {...settings}>
            <div>
                <img className="img" src="/images/AA12sapl.png" alt="img1" />
            </div>
            <div>
                <img className="img" src="/images/img133351.jpg" alt="img2" />
            </div>
            <div>
                <img className="img" src="/images/img168341.jpg" alt="img3" />
            </div>
            <div>
                <img className="img" src="/images/israel-476955_1280-1g.jpg" alt="img4" />
            </div>
            <div>
                <img className="img" src="/images/israel-lanscape.jpg" alt="img5" />
            </div>
        </Slider>
    );
}

export default Home;
