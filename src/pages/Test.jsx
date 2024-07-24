import { Cartt } from "../components/Cart"
import { WishList } from "../components/WishList"
import WishPageComponent from "../components/WishPageComponent"
import WishPage from "./WishPage"

export const Test=()=>{
    return(
        <div className="w-screen h-screen flex justify-center items-center">
            <WishPage/>
            {/* <WishList/> */}
        </div>
    )
}