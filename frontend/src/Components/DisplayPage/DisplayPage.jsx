import React, { useEffect } from "react";
import { Carousel } from "bootstrap";
import HeroText from "./TypeWriter";

function DisplayPage() {

  useEffect(() => {
    const el = document.getElementById("carouselExampleSlidesOnly");
    if (el) {
      new Carousel(el, {
        interval: 4000,
        ride: "carousel",
      });
    }
  }, []);

  return (
    <div className="container bg-dark text-white min-vh-100 mt-0 py-4 ">

      <div className="text-center mt-5 mb-3">
      </div>

      <div className="hero-carousel mb-4 mx-auto">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide-to="0"
              className="active"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide-to="1"
            ></button>
            <button
              type="button"
              data-bs-target="#carouselExampleSlidesOnly"
              data-bs-slide-to="2"
            ></button>
          </div>

          <div className="carousel-inner rounded-4 ">
            <div className="carousel-item active ">
              <img src="image5.jpeg" className="d-block w-100 hero-img" alt="1" />
            </div>
            <div className="carousel-item">
              <img src="image6.jpeg" className="d-block w-100 hero-img" alt="2" />
            </div>
            <div className="carousel-item">
              <img src="image3.jpg" className="d-block w-100 hero-img" alt="3" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-4 px-2">
        <HeroText />
      </div>

      <hr />
    </div>
  );
}

export default DisplayPage;
