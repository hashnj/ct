import React, { useEffect, useState } from 'react';

const ImageScroller = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); 

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-64 overflow-hidden">
            <div
                className="absolute flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%) ` }}
            >
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className="w-screen object-cover lg:mx-[16%] "
                    />
                ))}
            </div>
        </div>
    );
};

export default ImageScroller;