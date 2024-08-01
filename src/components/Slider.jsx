import Slide1 from '../assets/slider-1.webp';
import Slide2 from '../assets/slider-2.webp';
import mobile from '../assets/elec.jpg';
import fash from '../assets/fashion.jpg';
import fruit from '../assets/fruits.jpg';
import { useContext, useMemo } from 'react';
// import { MyContext } from '../pages/Main';

const slides = [
  {
    src: Slide1,
    title: 'Don’t miss amazing grocery deals',
    description: 'Sign up for the daily newsletter',
  },
  {
    src: Slide2,
    title: 'Fresh Vegetables - Big discount',
    description: 'Sign up for the daily newsletter',
  },
  {
    src: fash,
    title: 'Latest Fashion - upto 60% off',
    description: 'Grab Now!',
  },
  {
    src: mobile,
    title: 'Laptops - At great discounts',
    description: 'Get them today, before it ends!',
  },
  {
    src: fruit,
    title: 'Fresh and Exotic Fruits - great offers',
    description: 'Get them delivered at your doorsteps!',
  },
];
export const Slider = () => {

  const settings = useMemo(() => ({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: window.innerWidth > 992,
    autoplay: true,
  }), []);


const renderSlides = () => slides.map((slide, index) => (
  <div className="item" key={index}>
    <img src={slide.src} className="w-full" alt={slide.title} loading="lazy" />
    <div className="info">
      <h2 className="mb-4">{slide.title.split(' - ')[0]}<br />{slide.title.split(' - ')[1]}</h2>
      <p>{slide.description}</p>
    </div>
  </div>
));

return (
  <section className="homeSlider">
    <div className="container-fluid position-relative">
      
        {renderSlides()}
      
    </div>
  </section>
);
};