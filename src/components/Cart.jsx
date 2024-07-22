import { FaCartArrowDown } from "react-icons/fa"
import { Cart } from '../assets/Svg'
export const Cartt=({size,sub})=>{
    return(
        <div className="flex w-14 flex-col justify-center items-center ">
        <div value='Wishlist' className={`bg-primary peer text-background hover:bg-primary/80 p-2 hover:text-text size-${size} text-4xl flex items-center justify-center rounded-full`} >
            <FaCartArrowDown/>
        </div>
        <div className={`hidden ${sub?'peer-hover:flex':''} text-text text-base`}>
            Cart
        </div>
        </div>
    )
}