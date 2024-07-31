
import React, { useEffect, useRef, useState } from 'react';

export const Test = () => {
  const stickyRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const stickyDiv = stickyRef.current;

      if (scrollTop > stickyDiv.offsetTop) {
        if (!isSticky) {
          setIsSticky(true);
          setLastScrollTop(scrollTop);
        }

        const scrollSpeed = 3; // Adjust this value to control the scroll speed
        const delta = (scrollTop - lastScrollTop) * scrollSpeed;

        window.scrollTo(0, lastScrollTop + delta);
        setLastScrollTop(lastScrollTop + delta);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isSticky, lastScrollTop]);

  return (
    <div className="flex flex-col items-center">
      <div ref={stickyRef} className="sticky top-0 bg-gray-100 p-2 w-full text-center z-50">
        Sticky Content
      </div>
      <div className="p-5 w-4/5">
        {/* Your main content here */}
    
        <p>Lorem ipsum dolor sit amet...</p>
        {/* Repeat the above line to create a long content for scrolling */}
      </div>
    </div>
  );
};


