import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useEffect, useState, useContext } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';
import { useRecoilValueLoadable } from 'recoil';
import { products } from '../store/products';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const ProdSlider = () => {
  const prod = useRecoilValueLoadable(products);
  console.log(prod);
  const [prodData, setProdData] = useState([]);
  const context = useContext(MyContext); 

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 856,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ],
    fade: false,
    arrows: true,
    autoplay: 2000,
    centerMode: context.windowWidth > 992 ? true : false
  
  };

  useEffect(() => {
    if (prod.state === 'hasValue') {
      const data = prod.contents.data;
      const prodMap = data?.reduce((acc, product) => {
        const prodId = product._id;
        const prodName = product.name;
        const prodImage = product.images[0];
        const stock = product.stock;

        if (!acc[prodId]) {
          acc[prodId] = {
            _id: prodId,
            name: prodName,
            image: prodImage,
            product_count:stock
          };
        }
        return acc;
      }, {});

      if(data){
      setProdData(Object.values(prodMap));
      }
    }
  }, [prod.state, prod.contents]);

  if (prod.state === 'loading') {
    return (
      <div className="flex justify-center items-center bg-background text-primary h-screen">
        <AiOutlineLoading3Quarters className="text-7xl animate-spin" />
      </div>
    );
  }

  if (prod.state === 'hasValue') {
    return (
      <div className="text-text w-full ">
        <div className="slider-container w-full relative" >
          {/* <h2 className="text-2xl font-bold mb-4">Featured Categories</h2> */}
          <Slider {...settings} className="w-full">
            {prodData.length > 0 && prodData.map((prod, index) => (
              <div className="item px-2" key={prod._id}>
                <Link to={`/product/${prod._id}`} className="block">
                  <div className="info mx-auto flex flex-col items-center justify-center rounded-xl p-4 h-56 md:h-72  transition-all duration-300 ease-in-out bg-white/80">
                    <img src={prod.image} className="rounded-2xl m-1  h-4/5" alt={`${prod.name}`} />
                    <h5 className="capitalize text-black mt-3 text-lg font-semibold">{prod.name}</h5>
                    <p className="text-sm opacity-80 text-primary mb-0">Quty. left : {prod.product_count}</p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }

  return null; 
};

export default ProdSlider;
