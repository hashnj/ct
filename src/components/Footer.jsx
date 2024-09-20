import React, { useEffect } from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { themeState } from '../store/atoms';
import { Cart } from '../assets/Svg';

const SocialIcon = ({ icon: Icon }) => (
  <Icon className="social-icon hover:text-primary/50" size={30} />
);
const Footer = () => {


  const items = [
    { type: 'icon', icon: FaFacebookSquare },
    { type: 'icon', icon: FaInstagram },
    { type: 'icon', icon: FaTwitterSquare },
    { type: 'icon', icon: FaGithubSquare },
    { type: 'icon', icon: FaDribbbleSquare },
    // Footer sections
    { type: 'section', title: 'Solutions', items: ['Analytics', 'Marketing', 'Commerce', 'Insights'] },
    { type: 'section', title: 'Support', items: ['FAQ','Shipping','Returns','Order Status','Payment Options'] },
    { type: 'section', title: 'Company', items: ['About Us', 'Get App', 'Careers', 'Affiliate Programs'] },
    { type: 'section', title: 'Legal', items: ['Claim', 'Policy', 'Terms'] },
  ];


  const theme = useRecoilValue(themeState);
  useEffect(() => {
    document.body.classList = theme + ' bg-background';
  }, [theme]);


  return (
    <div className='bg-backgrounds mx-auto py-14 px-6 grid lg:grid-cols-3 gap-8 z-30 text-text/90'>
      <div>
        <div className='flex w-full'>
        <h1 className=' text-3xl lg:text-4xl xl:text-5xl pr-2 font-bold text-primary'>CORECART</h1>
        <Cart size={12} fil={theme == 'dark' ? '#fff' :''}/>
        </div>
        <p className='py-4 font-thin'>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id odit ullam iste repellat consequatur libero reiciendis, blanditiis accusantium.
        </p>
        <div className='flex justify-between md:w-[75%] my-6'>

          {items.map((item, index) => (
            item.type === 'icon' ? (
              <SocialIcon key={index} icon={item.icon} />
            ) : null
          ))}

        </div>
      </div>

      <div className='lg:col-span-2 flex justify-between mt-6'>
        

        {items.map((item, index) => (
          item.type === 'section' ? (
            <div key={index}>
              <h6 className="font-medium text-text cursor-default text-xl">{item.title}</h6>
              <ul>

                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex} className='py-2 cursor-default text-text/80 font-normal hover:text-primary/60 text-sm'>{subItem}</li>
                ))}

              </ul>
            </div>
          ) : null
        ))}

      </div>
    </div>
  );
};
export default Footer;