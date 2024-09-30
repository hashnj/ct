import React, { useEffect, useRef, useState, useContext } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { MyContext } from '../App';
import { useRecoilValueLoadable } from 'recoil';
import { products } from '../store/products';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const CatSlider = () => {
  const prod = useRecoilValueLoadable(products);
  const [categoryData, setCategoryData] = useState([]);
  const context = useContext(MyContext); 
  const [itemBg] = useState([
    '#fffceb', '#ecffec', '#feefea', '#fff3eb', '#fff3ff', '#f2fce4',
    '#feefea', '#fffceb', '#feefea', '#ecffec', '#feefea', '#fff3eb',
    '#fff3ff', '#f2fce4', '#feefea', '#fffceb', '#feefea', '#ecffec'
  ]);

  const slider = useRef();

  // const settings = {
  //   dots: false,
  //   infinite: false,
  //   speed: 500,
  //   slidesToShow: context.windowWidth > 1200 ? 10 : context.windowWidth > 768 ? 5 : 3,
  //   slidesToScroll: 2,
  //   fade: false,
  //   arrows: context.windowWidth > 992, 
  //   autoplay: context.windowWidth > 992 ? 2000 : false,
  //   centerMode: context.windowWidth > 992
  // };


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };


  useEffect(() => {
    if (prod.state === 'hasValue') {
      const data = prod.contents.data;

      const categoryMap = data.reduce((acc, product) => {
        const categoryId = product.category_id._id;
        const categoryName = product.category_id.name;
        const categoryImage = product.images[0];

        if (!acc[categoryId]) {
          acc[categoryId] = {
            category_id: categoryId,
            category_name: categoryName,
            image: categoryImage,
            product_count: 0
          };
        }

        acc[categoryId].product_count += 1; 
        return acc;
      }, {});

      setCategoryData(Object.values(categoryMap));
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
      <div className="bg-background text-text w-full ">
        <div className="slider-container" ref={slider}>
          <h2 className="text-2xl font-bold mb-4">Featured Categories</h2>
          <Slider {...settings} className="">
            {categoryData.length > 0 && categoryData.map((category, index) => (
              <div className="item" key={category.category_id}>
                <Link to={`/cat/${category.category_name.toLowerCase()}`} className="block">
                  <div className="info mx-auto flex flex-col items-center justify-center p-4 transition-all duration-300 ease-in-out" style={{ background: itemBg[index % itemBg.length] }}>
                    <img src={category.image} width="80" alt={`${category.category_name} category`} />
                    <h5 className=" capitalize text-black mt-3 font-semibold">{category.category_name}</h5>
                    <p className="text-sm opacity-80 mb-0">{category.product_count} items</p>
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

export default CatSlider;
