import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { themeState } from '../store/atoms';
import { IoFilterSharp } from 'react-icons/io5';
import { filterr } from '../store/filter';

export const FilterComponent = () => {
  const theme = useRecoilValue(themeState);
  const [filter, setFilter] = useRecoilState(filterr);
  const [price, setPrice] = useState(51);
  const [pricee, setPricee] = useState(5);

  useEffect(() => {
    document.body.classList = theme;
  }, [theme]);

  return (
    <div 
      className={`p-4 ${filter ? 'h-14' : ''} transition-all duration-300 bg-background shadow-md rounded-md sticky top-20 border border-text/10`} 
      
      aria-expanded={!filter}
    >
      <h2 onClick={() => { setFilter(s => !s); }} className="text-xl font-semibold cursor-pointer flex justify-between items-center font-serif text-primary mb-4">
        Filter <IoFilterSharp />
      </h2>
      <div className={`space-y-4 transition-all duration-300 ${filter ? 'hidden' : 'block'}`}>
        <div className=''>
          <h3 className="font-medium text-md text-primary mb-2">Filter by Price</h3>
          <div className='relative'>
          <input 
            type="range" 
            value={price} 
            min="0" 
            max="1000" 
            className="w-full absolute z-2 mt-4 h-[1px] accent-primary no " 
            onChange={(e) => {
              setPrice(e.target.value)
              console.log(e.target.value,1);
  }}
          />
          <input 
            type="range" 
            value={pricee} 
            min="0" 
            max="1000" 
            className="w-full absolute z-2 mt-3 h-[1px] accent-primary no " 
            onChange={(e) => {
              setPrice(e.target.value)
              console.log(e.target.value,2);
             }} 
          />
          </div>
          <div className="flex mt-7 justify-between text-sm">
            <span>$0</span>
            <span className='text-thin'>${price}</span>
            <span>$1000</span>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-md mb-2 text-primary">Deals and Discounts</h3>
          <ul className="space-y-1">
            <li>
              <input 
                type="checkbox" 
                id="deal1" 
                className="mr-2 text-primary focus:ring-primary" 
              /> 
              <label htmlFor="deal1">Clearance</label>
            </li>
            <li>
              <input 
                type="checkbox" 
                id="deal2" 
                className="mr-2 text-primary focus:ring-primary" 
              /> 
              <label htmlFor="deal2">Buy 1 Get 1</label>
            </li>
            <li>
              <input 
                type="checkbox" 
                id="deal3" 
                className="mr-2 text-primary focus:ring-primary" 
              /> 
              <label htmlFor="deal3">Seasonal Sale</label>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-md mb-2 text-primary">Filter by Category</h3>
          <ul className="space-y-1">
            <li>
              <input 
                type="checkbox" 
                id="category1" 
                className="mr-2 text-primary focus:ring-primary" 
              /> 
              <label htmlFor="category1">Electronics</label>
            </li>
            <li>
              <input 
                type="checkbox" 
                id="category2" 
                className="mr-2 text-primary focus:ring-primary" 
              /> 
              <label htmlFor="category2">Clothing</label>
            </li>
            <li>
              <input 
                type="checkbox" 
                id="category3" 
                className="mr-2 text-primary focus:ring-primary" 
              /> 
              <label htmlFor="category3">Home & Kitchen</label>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-md mb-2 text-primary">Filter by Subcategory</h3>
          <ul className="space-y-1">
            <li>
              <input 
                type="checkbox" 
                id="subcategory1" 
                className="mr-2 text-primary focus:ring-primary" 
              /> 
              <label htmlFor="subcategory1">Smartphones</label>
            </li>
            <li>
              <input 
                type="checkbox" 
                id="subcategory2" 
                className="mr-2 text-primary focus:ring-primary" 
              /> 
              <label htmlFor="subcategory2">Laptops</label>
            </li>
            <li>
              <input 
                type="checkbox" 
                id="subcategory3" 
                className="mr-2 text-primary focus:ring-primary" 
              /> 
              <label htmlFor="subcategory3">Headphones</label>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-medium text-md mb-2 text-primary">Filter by Review</h3>
          <select 
            className="w-full border border-text/30 focus:border-none text-text bg-background focus:ring-primary rounded-lg p-2"
          >
            <option value="">Select Rating</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars & Up</option>
            <option value="3">3 Stars & Up</option>
            <option value="2">2 Stars & Up</option>
            <option value="1">1 Star & Up</option>
          </select>
        </div>

<div>
    <button className='bg-primary text-background rounded-md py-2 w-full hover:bg-primary/90'>Apply</button>
</div>

      </div>
    </div>
  );
};
