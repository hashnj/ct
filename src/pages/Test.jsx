import { Cartt } from "../components/Cart"
import { ShowCategories } from "../components/ShowCategories"
import { WishList } from "../components/WishList"
import WishPageComponent from "../components/WishPageComponent"
import ProductInfo from "./ProductInfo"
import WishPage from "./WishPage"

export const Test=()=>{
    return(
        <div className="w-screen min-h-screen h-full flex justify-center items-center">
            <ShowCategories/>
            {/* <WishList/>  */}
        </div>
    )
}