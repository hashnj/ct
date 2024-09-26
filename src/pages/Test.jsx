
import React, { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import { useRecoilValue } from 'recoil';
import { themeState } from '../store/atoms';
import { Nav } from '../components/Nav';
import { SecondNav } from '../components/SecondNav';


export const Test = () => {
  const theme = useRecoilValue(themeState);
  useEffect(() => {
    document.body.classList = theme + ' bg-background';
  }, [theme]);

  return (
    <div className="flex bg-text w-full h-screen flex-col items-center">
      <div className='w-full pr-2'>
        {/* <Nav/> */}
        <SecondNav/>
        </div>
    </div>
  );
};


