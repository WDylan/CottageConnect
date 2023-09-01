import React, { useState } from "react";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import "./Carousel.scss";

const Carousel = ({ images }) => {
  const [slide, setSlide] = useState(0);

  const nextSlide = () => {
    setSlide(slide === images.length - 1 ? 0 : slide + 1);
  };

  const prevSlide = () => {
    setSlide(slide === 0 ? images.length - 1 : slide - 1);
  };

  return (
    <div className="carousel">
      <KeyboardDoubleArrowLeftIcon
        onClick={prevSlide}
        className="arrow arrowLeft"
      />
      <img className="imgCarou" src={images[slide]} alt="carousel slide" />
      <KeyboardDoubleArrowRightIcon
        onClick={nextSlide}
        className="arrow arrowRight"
      />
    </div>
  );
};

export default Carousel;
