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
    console.log(a,role);
    useEffect(()=>{
        if(a){
        setRole(a.role);
        }
        console.log(role);
    },[a])
    console.log(role);
    const handleToggle = () => {
        setActive(!active);
    };
    if(role=='Vendor' || role=='Admin'){
    return (
        
        <div className={`fixed h-full z-10 ${active ? 'w-64 bg-background' : 'w-[50px] items-center bg-background/20'} text-text left-0 transition-all duration-300 flex flex-col ease-in-out top-0`}>
            <div className={`h-full z-10 ${active ? 'w-64 ' : 'w-[50px] items-center'} text-text transition-all duration-300 flex flex-col mt-[75px] px-1`}>
                <div className={`flex ${active ? 'justify-end':'justify-center'} w-full px-2 py-3`}>
                    <button onClick={handleToggle} className='text-3xl text-primary '>
                        <FaBars />
                    </button>
                </div>
                {active&& (role == 'Vendor' || role == 'Admin') && <div className='py-7 mx-auto text-2xl'>{top}</div>}

                {top != 'Home' &&
                    <div onClick={() => nav('/')} className={`cursor-pointer border w-full my-1  border-text/30 py-2 flex justify-center bg-backgrounds rounded-lg hover:bg-primary hover:text-white transition-colors duration-200`}>
                    {active ? <><FaHome className='mr-2 text-xl' /> Home</> : <FaHome />}
                    {!active && <Tooltip id="home-tooltip" content="Home" />}
                </div>}

                {(role == 'Vendor' || role == 'Admin') && (
                    <div onClick={() => nav('/vendor')} className={`cursor-pointer border ${top == 'Vendor Dashboard' ? 'bg-primary text-text':''} border-text/30 w-full py-2 my-1 flex justify-center bg-backgrounds rounded-lg hover:bg-primary hover:text-white transition-colors duration-200`}>
                        {active ? <><FaThLarge className='mr-2 text-xl' /> Vendor Dashboard</> : <FaThLarge />}
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
                {/* {role=='Customer' && active&& <div className='w-full flex-col  py-2 flex justify-center bg-background rounded-lg transition-colors duration-200'>
                    <><div className='py-2 border-b border-text/40 w-full mx-1  text-center'>
                        <div className='font-serif text-2xl'> Filter </div>
                        </div>
                        <div className=' group mx-2'>
                            <Search />
                            <div className='border-t peer w-full peer-focus:border-t-4 peer-focus:border-text'></div>
                        </div>
                        </></div>} */}
            </div>
        </div>
    );
};
}

export default SideBar;
