import { useRecoilState, useRecoilValue } from 'recoil';
import { sideBar } from '../store/dash';
import { useNavigate } from 'react-router-dom';
import { rol } from '../store/atoms';
import auth from '../hooks/auth';
import { FaHome, FaBars, FaThLarge, FaClipboardList, FaUserShield } from 'react-icons/fa';
import { Tooltip } from 'react-tooltip';
import { useEffect, useState } from 'react';

export const SideBar = ({ top }) => {
    const nav = useNavigate();
    const [active, setActive] = useRecoilState(sideBar);
    const a=auth();
    const [role,setRole]=useState('');
    useEffect(()=>{
        if(a){
        setRole(a.role);
        }
    },[a])
    const handleToggle = () => {
        setActive(!active);
    };
    if(role=='Vendor' || role=='Admin'){
    return (
        
        <div className={`fixed  z-10 ${active ? 'w-64 bg-background h-full' : 'w-[50px] items-center bg-background/20'} text-text left-0 transition-all duration-300 hidden md:flex flex-col ease-in-out top-0`}>
            <div className={`h-full z-10 ${active ? 'w-64 ' : 'w-[50px] items-center'} text-text transition-all duration-300 flex flex-col mt-[75px] px-1`}>
                {active&& (role == 'Vendor' || role == 'Admin') && top && <div className='py-7 mx-auto text-2xl'>{top}</div>}

                {top != 'Home' &&
                    <div onClick={() => nav('/')} className={`cursor-pointer border w-full my-1  border-text/30 py-2 flex justify-center bg-backgrounds rounded-lg hover:bg-primary hover:text-white transition-colors duration-200`}>
                    {active ? <><FaHome className='mr-2 text-xl' /> Home</> : <FaHome />}
                    {!active && <Tooltip id="home-tooltip" content="Home" />}
                </div>}

                {(role == 'Vendor' || role == 'Admin' || role == 'Customer') && (
                    <div onClick={() => nav('/vendor')} className={`cursor-pointer border ${top == 'Vendor Dashboard' ? 'bg-primary text-text':''} border-text/30 w-full py-2 my-1 flex justify-center bg-backgrounds rounded-lg hover:bg-primary hover:text-white transition-colors duration-200`}>
                        {active ? <><FaThLarge className='mr-2 text-xl' /> Explore</> : <FaThLarge />}
                        {!active && <Tooltip id="vendor-tooltip" content="Vendor Dashboard" />}
                    </div>
                )}

                {(role == 'Admin' || role == 'Vendor') &&
                    <div onClick={() => nav('/your-listings')} className={`cursor-pointer border ${top == 'Your-Listings' ? 'bg-primary text-text':''} border-text/30 w-full py-2 my-1 flex justify-center bg-backgrounds rounded-lg hover:bg-primary hover:text-white transition-colors duration-200`}>
                    {active ? <><FaClipboardList className='mr-2 text-xl' /> Product Listings</> : <FaClipboardList />}
                    {!active && <Tooltip id="listings-tooltip" content="Product Listings" />}
                </div>}

                {role == 'Admin' && (
                    <div onClick={() => nav('/dashboard')} className={`cursor-pointer border ${top == 'Dashboard' ? 'bg-primary text-text':''} border-text/30 w-full py-2 my-1 flex justify-center bg-backgrounds rounded-lg hover:bg-primary hover:text-white transition-colors duration-200`}>
                        {active ? <><FaUserShield className='mr-2 text-xl' /> Admin Dashboard</> : <FaUserShield />}
                        {!active && <Tooltip id="admin-tooltip" content="Admin Dashboard" />}
                    </div>
                )}
            </div>
        </div>
    );
};
}

export default SideBar;
