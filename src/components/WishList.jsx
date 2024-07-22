import { FaRegHeart } from "react-icons/fa"

export const WishList=({size , sub})=>{
    return(
        <div className="flex w-14 flex-col justify-center items-center ">
        <div value='Wishlist' className={`bg-primary peer text-background hover:bg-primary/80 hover:text-text/90 p-2 size-${size} text-4xl flex items-center justify-center rounded-full`} >
            <FaRegHeart />
        </div>
        <div className={`hidden ${sub?'peer-hover:flex':''} text-text text-base`}>
            Wishlist
        </div>
        </div>
    )
}