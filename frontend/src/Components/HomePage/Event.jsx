import React,{ useEffect }from "react";
import { Carousel } from "bootstrap";
function Event() {
  useEffect(() => {
    const el = document.getElementById("carouselExampleAutoplaying");
    el && new Carousel(el, { interval: 3000, ride: "carousel" });
  }, []);

    return(
      <div id="carouselExampleAutoplaying" className="carousel slide mt-5 pb-2 pt-3 " data-bs-ride="carousel">

  <div className="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>

 
  <div className="carousel-inner ">
    <div className="carousel-item active">
  <div className="carousel-img-wrapper">
    <img src="slide1.jpg" alt="slide" />
  </div>
</div>

<div className="carousel-item">
  <div className="carousel-img-wrapper ">
    <img src="slide4.jpeg" alt="slide" />
  </div>
</div>

<div className="carousel-item">
  <div className="carousel-img-wrapper ">
    <img src="slide3.jpg" alt="slide" />
  </div>
</div>

  </div>

 
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
    <span className="carousel-control-prev-icon"></span>
  </button>

  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
    <span className="carousel-control-next-icon"></span>
  </button>

</div>


    )
}

export default Event;