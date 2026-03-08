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
    <div className="container text-white min-vh-60 mt-2">

      <div className="text-center ">
      </div>

      <div className="hero-carousel mb-0 ">
        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-indicators ">
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

          <div className="carousel-inner rounded  h-50 ">
            <div className="carousel-item active ">
              <img src="image5.jpeg" className="d-block w-100 hero-img rounded " style={{height:"250px"}} alt="1" />
            </div>
            <div className="carousel-item">
              <img src="image6.jpeg" className="d-block w-100 hero-img rounded" style={{height:"250px"}} alt="2" />
            </div>
            <div className="carousel-item">
              <img src="image3.jpg" className="d-block w-100 hero-img rounded" style={{height:"250px"}} alt="3" />
            </div>
          </div>
        </div>
      </div>

      <div className="mb-0 px-2">
        <HeroText />
      </div>

      <hr />

      <div className="cotnatiner m-2 px-3 border  border-secondary  border-opacity-50 rounded">
      CAMPUS NEWS
      <p>❯ New- magzines is available in library !</p>
      <p>❯ Apply for ....</p>
      <p>❯ Next week,College Badminton selection</p>
      <p>❯ Infosis arrived our college next month - Placement Cell</p>
      </div>
    </div>
  );
}

export default DisplayPage;
