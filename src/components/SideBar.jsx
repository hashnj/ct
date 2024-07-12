import {useRecoilState, useRecoilValue} from 'recoil'
import { sideBar } from '../store/dash'
import { useNavigate } from 'react-router-dom';
import { rol} from '../store/atoms';
import { auth } from '../store/auth';
export const SideBar=({top})=>{
    const nav=useNavigate();
    const [active,setActive]= useRecoilState(sideBar);
    const role = useRecoilValue(rol);
    console.log(role);
    return(
        <div className={`absolute h-full z-10 ${active?'w-64 ':'w-[50px] items-center'} text-text  bg-background left-0 transition-all duration-300 flex flex-col  ease-in-out top-0 `}>
            <div className={`h-full z-10 ${active?'w-64 ':'w-[50px] items-center'} text-text transition-all duration-300 flex flex-col mt-[75px] px-1`}>
            {active?<div className='py-7 mx-auto text-2xl'>{top}</div>:''}
            
            
            <div onClick={()=>nav('/')} className='cursor-pointer border w-full my-1 border-text/30  py-2 flex justify-center bg-backgrounds rounded-lg'>{active?'Home':'H'}</div>
            
            
            {role=='Vendor'||role=='Admin'?<div onClick={()=>nav('/vendor')} className='cursor-pointer border border-text/30 w-full py-2 my-1 flex justify-center bg-backgrounds rounded-lg'>{active?'Vendor Dashboard':'VD'}</div>:<div></div>}
            
            
            <div onClick={()=>nav('/your-listings')} className='cursor-pointer border border-text/30 w-full py-2 my-1 flex justify-center bg-backgrounds rounded-lg'>{active?'Product Listings':'PL'}</div>
            
            
            {role=='Admin'?<div onClick={()=>nav('/dashboard')} className='cursor-pointer border border-text/30 w-full py-2 my-1 flex justify-center bg-backgrounds rounded-lg'>{active?'Admin Dashboard':'D'}</div>:<div></div>}
            </div>
        </div>
    )
}