import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { sideBar } from "../store/dash";


export const Nav=()=>{
    const [dark,setDark]=useState(false);
    const [sidebar,setSidebar]=useRecoilState(sideBar);
    const nav=useNavigate();
    useEffect(()=>{
        const b= document.body;
        b.classList='';
        document.body.classList=localStorage.getItem('theme');
        if(dark){
            localStorage.setItem('theme','dark')
        }
    },[dark])
    return(
        <div className={`flex justify-between z-20 bg-background w-full py-3 px-1  ${!dark?'border-b':''} top-0 fixed`}>
            <div>
            <div className={`flex justify-center relative items-center  z-30  cursor-default `} >{/** ${sidebar?'translate-x-24 opacity-0':''} */}
                <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{
                setSidebar(s=>!s);
                console.log(sidebar);
            }} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10 text-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <div className="pl-2  text-2xl text-primary"> 
                CoreCart
                </div>
            </div>
            </div>
            <div className="flex ">

            <Menu as="div" className="inline-block text-left">
                    <MenuButton className={`rounded-full  bg-background flex justify-center text-primary size-12 items-center `}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"  viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                    </svg>
                    </MenuButton>
                    <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <MenuItems className="absolute right-24 z-10 w-32 origin-top-right  rounded bg-background text-text shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className=" text-sm">
                                <MenuItem>
                                    {() => (
                                        <button 
                                            className={`group flex items-center text-text  w-full px-2 py-2 text-sm ${dark? '' :'bg-text/30'} `}
                                            onClick={()=>{
                                                localStorage.setItem('theme','light');
                                                setDark(false);
                                            }
                                                }>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6 pr-1">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                                                </svg>Light
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {() => (
                                        <button
                                            className={`group flex items-center  w-full  px-2 py-2 text-sm ${dark?'bg-primary/20':''} `}
                                            onClick={()=>{
                                                localStorage.setItem('theme','dark');
                                                setDark(true);
                                            }
                                                }>
                                                <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" fill="none" strokeWidth="1.5" stroke="currentColor" className="size-6 pr-1">
                                                    <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z" clipRule="evenodd" />
                                                </svg>Dark
                                        </button>
                                    )}
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu>
                
                <div className="bg-background flex justify-center items-center rounded-full size-12 text-text mr-1 cursor-pointer my-auto">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
                    <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z" clipRule="evenodd" />
                </svg>

                </div>
                <Menu as="div" className="inline-block text-left my-auto">
                    <MenuButton className={`bg-primary/50 rounded-full size-10 mr-1  flex justify-center items-center `}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>

                    </MenuButton>
                    <Transition
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded bg-background text-text shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 pl-2 text-sm">
                                <MenuItem><div className="flex m-2">
                                <div className="bg-text/50 size-12  flex justify-center items-center rounded-full">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                </svg>
                                </div>
                                <div className="pl-2">
                                <div className="text-lg ">Full Name</div>
                                <div className="">email@gmail.com</div>
                                </div>
                                </div>
                                </MenuItem>
                                <MenuItem>
                                    {() => (
                                        <button
                                            className="group flex items-center text-text  w-full px-2 py-2 text-sm"
                                            onClick={()=>{
                                                nav('/your-profile')
                                            }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mr-1">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                                                </svg>Profile
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {() => (
                                        <button
                                            className="group flex items-center  w-full px-2 py-2 text-sm ">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mr-1">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                                </svg>Setting
                                        </button>
                                    )}
                                </MenuItem>
                                <MenuItem>
                                    {() => (
                                        <button onClick={()=>{
                                            localStorage.removeItem('token')
                                            nav('/auth/login')
                                        }}
                                            className="group flex items-center  w-full px-2 py-2 text-sm">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mr-1">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                                </svg>Logout
                                        </button>
                                    )}
                                </MenuItem>
                            </div>
                        </MenuItems>
                    </Transition>
                </Menu>
                </div>

        </div>
    )
}