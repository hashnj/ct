import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { sideBar } from "../store/dash";
import { authCheck } from "../store/auth";
import { FaBars, FaCartArrowDown, FaHeart, FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { Bell, Cart, FillSun, Gear, Moon, Out, Profile, Sun } from "../assets/Svg";
import { Search } from "./Search";
import { themeState } from "../store/atoms";

export const Nav = ({home}) => {
  const [sidebar, setSidebar] = useRecoilState(sideBar);
  const nav = useNavigate();
  const info = useRecoilValueLoadable(authCheck);
  const [theme,setTheme]=useRecoilState(themeState);
  const [active, setActive] = useRecoilState(sideBar);


  useEffect(() => {
    document.body.classList = theme + ' bg-backgrounds';
  }, [theme]);


if(info.state === 'hasValue'){
  
  return (
    <div className={`flex justify-between z-30 bg-background w-full py-3 px-4 border-b fixed top-0 left-0 ${theme=='dark' ? 'border-gray-700' : 'border-gray-300'}`}>
      <div className="flex items-center ">
      { info.contents.role != 'Customer' && <button onClick={()=>{setActive(!active)}} className={`relative w-8 h-8  text-3xl text-primary hidden md:flex`}>
                        <FaBars className={`${active?'opacity-0':''} absolute top-0 transition-all duration-300`}/>
                        <ImCross className={`${active?'rotate-90':'opacity-0'} absolute top-0 transition-all duration-300`} />
                    </button>}
        <div className={`text-4xl relative pl-2 font-serif text-primary font-semibold cursor-pointer`} onClick={()=>nav('/')}>CoreCart</div>
      </div>
      {home && <div className="w-4/5 px-2 sm:px-4 md:px-12 lg:px-52 xl:px-72  mx-auto">
      <div className="w-full rounded-xl border-primary flex border">
        <div className="w-12 flex justify-center items-center pointer-events-none"> <FaSearch/></div>
        <Search />        
      </div>
      </div>}
      <div className="flex items-center  space-x-4">
        <Menu as="div" className="relative hidden md:block">
          <MenuButton className={`p-2 text-primary `}>
          <FillSun/>
          </MenuButton>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-0 mt-2 w-32 bg-background text-text shadow-lg ring-1 ring-black ring-opacity-5 rounded-md">
              <div className="p-2">
                <MenuItem>
                  {({ active }) => (
                    <button 
                      className={`group flex items-center w-full px-2 py-2 text-sm rounded-md ${active ? 'bg-primary/20' : ''}`}
                      onClick={() => {
                        localStorage.setItem('theme', 'light');
                        setTheme(localStorage.getItem('theme'))
                        
                      }}>
                      <Sun />
                      Light
                    </button>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <button 
                      className={`group flex items-center w-full px-2 py-2 text-sm rounded-md ${active ? 'bg-primary/20' : ''}`}
                      onClick={() => {
                        localStorage.setItem('theme', 'dark');
                        setTheme(localStorage.getItem('theme'))
                      }}>
                      <Moon/>
                      Dark
                    </button>
                  )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>

        <div className="bg-background hidden md:block p-2 text-xl rounded-full cursor-pointer" onClick={()=>{nav('/cart')}}>
        <FaCartArrowDown/>
        </div>
        <div className="bg-background hidden text-red-600 md:block p-2 text-xl rounded-full cursor-pointer" onClick={()=>{nav('/wishlist')}}>
        <FaHeart/>
        </div>
        <Menu as="div" className="relative">
          <MenuButton className={`rounded-full hover:bg-primary/80 bg-primary p-2 text-text/80`}>
          <Profile/>
          </MenuButton>
          <Transition
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <MenuItems className="absolute right-2 mt-3 w-48 bg-backgrounds/80 text-text shadow-lg ring-1 ring-black ring-opacity-5 rounded-md">
              <div className="p-2">
                <MenuItem>
                  <div className="flex items-center  space-x-2">
                    <div className="bg-primary size-8 rounded-full flex justify-center items-center">
                    <Profile/>
                    </div>
                  <div>
                    {/* {console.log(info.contents.info)} */}
                      <div className="text-lg">{info.contents?.info?.userName || info.contents?.info?.userr?.userName}</div>
                      <div>{info.contents?.info?.email || info.contents?.info?.userr?.email}</div>
                    </div>
                  </div>
                </MenuItem>
                <MenuItem className='mt-3'>
                {({ active }) => (
                  <button 
                    className={`group flex items-center w-full px-2 py-2 rounded-md text-sm ${active?'bg-primary/20':''}`}
                    onClick={() => nav('/your-profile')}
                  >
                    <Profile/>
                    Profile
                  </button>
                )}
                </MenuItem>
                <MenuItem>
                {({ active }) => (
                  <button 
                    className={` group flex items-center w-full px-2 py-2 text-sm rounded-md ${active ? 'bg-primary/20':''}`}
                  >
                    <Gear/>
                    Settings
                  </button>
                )}
                </MenuItem>
                <MenuItem className='flex md:hidden'>
           {({ active }) => (
            <button 
              className={`group flex items-center w-full px-2 py-2 text-sm rounded-md ${active ? 'bg-primary/20' : ''}`}
              onClick={() => {
                localStorage.setItem('theme', 'light');
                setTheme(localStorage.getItem('theme'))

              }}>
              <Sun />
              Light
            </button>
          )}
        </MenuItem>
        <MenuItem className='flex md:hidden'>
          {({ active }) => (
            <button 
              className={`group flex items-center w-full px-2 py-2 text-sm rounded-md ${active ? 'bg-primary/20' : ''}`}
              onClick={() => {
                localStorage.setItem('theme', 'dark');
                setTheme(localStorage.getItem('theme'))

              }}>
              <Moon/>
              Dark
            </button>
          )}
        </MenuItem>
        <MenuItem className='flex md:hidden rounded-md hover:bg-primary/20 py-2 '>
        <div className="px-2 pr-4 text-sm">
        <Bell/> <div className="pl-1"> Notifications</div>
        </div>
</MenuItem>
                
                <MenuItem>
                {({ active }) => (
                  <button 
                    className={`group flex items-center w-full px-2 py-2 rounded-md text-sm ${active ? 'bg-primary/20' : ''}`}
                    onClick={() => {
                      localStorage.removeItem('token');
                      nav('/auth/login');
                    }}
                  >
                    <Out/>
                    Logout
                  </button>
)}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}
};




