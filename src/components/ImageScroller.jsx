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
                className="absolute flex transition-transform duration-700 ease-in-out md:-mt-36 -mt-24"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {images.map((image, index) => (
                    <div
                        key={index}
                        className="relative w-full h-full flex-shrink-0"
                    >
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            className="absolute top-0 left-0 w-full h-full object-cover blur-sm"
                        />
                        <img
                            src={image}
                            alt={`Slide ${index}`}
                            className="relative mx-auto object-contain h-full"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ImageScroller;
