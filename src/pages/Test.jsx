
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import { useRecoilValue } from 'recoil';
import { themeState } from '../store/atoms';
import { Nav } from '../components/Nav';
import { SecondNav } from '../components/SecondNav';
import CatSlider from '../components/CatSlider';


export const Test = () => {
  const theme = useRecoilValue(themeState);
  useEffect(() => {
    document.body.classList = theme + ' bg-background';
  }, [theme]);

  return (
    <div className="flex bg-background w-screen h-screen flex-col items-center">
      <div className='w-full '>
        {/* <Nav/> */}
        <CatSlider/>

        </div>
    </div>
  );
};


