import { IoIosRemoveCircle } from "react-icons/io";

const WishPageComponent=({title,description,image,price})=>{
    return(
        <div className="w-full flex my-3 justify-between p-6 items-center px-10 bg-text/50 rounded-md">
            <div className="flex  justify-center items-center">
            <div className="size-16 flex justify-center items-center overflow-hidden  rounded-full"><img src={image} alt="" /></div>
            <div className="flex pl-4 flex-col">
            <span className="text-3xl  font-extrabold">{title}</span> 
            <span className="text-lg font-thin">{description}</span>
            </div>
            </div>
            <div className="flex">
            <div className="pr-2 text-primary w-24 font-bold drop-shadow-[1px_1px_1px_rgb(225,225,225)]  text-xl">
            ${price}
            </div>
            <div className="text-3xl text-red-600">
            <IoIosRemoveCircle/>
            </div>
            </div>
        </div>
    )
}
export default WishPageComponent;