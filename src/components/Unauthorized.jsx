import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useRecoilValue } from "recoil";
import { themeState } from "../store/atoms";

export const Unauthorized=()=>{
    const nav=useNavigate();
    // const theme=useRecoilValue(themeState);
    // useEffect(()=>{
    //     document.body.classList=localStorage.getItem('theme');
    // },[]);

    return(
        <div className="bg-background flex flex-col justify-center items-center font-extrabold font-serif w-full h-screen text-text/70 text-5xl">
            <div>
            Unauthorized
            </div>
            <button onClick={()=>{nav(-1)}} className="text-xl text-primary/70 bg-text mt-4 p-2 rounded-xl">{`<-`} Go Back</button>
        </div>
    )
}