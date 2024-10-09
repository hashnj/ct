import { FaExclamation } from "react-icons/fa"

export const NotFound=()=>{
    return(
        <>
        <div className="w-screen h-screen bg-background text-5xl text-primary flex flex-col justify-center items-center">
            <div className="flex pb-4"> <FaExclamation/> 404 <FaExclamation/></div>
            <div>Page Not found </div>
        </div>
        </>
    )
} 