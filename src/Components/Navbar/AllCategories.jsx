import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function AllCategories() {
  const settings = {
    autoplay: false,
    autoplaySpeed: 1200,
    arrows: true,
    pauseOnFocus: false,
    pauseOnHover: true,
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 3,
          infinite: false,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const categories = [
    { name: 'Men', imgSrc: 'https://placehold.co/200x200/png' },
    { name: 'Women', imgSrc: 'https://placehold.co/200x200/png' },
    { name: 'Kids', imgSrc: 'https://placehold.co/200x200/png' },
    { name: 'Accessories', imgSrc: 'https://placehold.co/200x200/png' },
    { name: 'Shoes', imgSrc: 'https://placehold.co/200x200/png' },
    { name: 'Sale', imgSrc: 'https://placehold.co/200x200/png' },
    { name: 'Sale', imgSrc: 'https://placehold.co/200x200/png' },
    { name: 'Sale', imgSrc: 'https://placehold.co/200x200/png' },
    { name: 'Sale', imgSrc: 'https://placehold.co/200x200/png' },
  ];

  return (
    <div className="image-slider-container">
      <Slider {...settings} className="slider">
        {categories.map((category, index) => (
          <div key={index} className="slide">
            <img src={category.imgSrc} alt={category.name} className="slide-image" />
            <div className="slide-name text-center">{category.name}</div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
