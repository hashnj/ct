import { useRecoilState } from "recoil"
import { filterr } from "../store/filter"
import { WishList } from "./WishList"
import { Cartt } from "./Cart"
import { useNavigate } from "react-router-dom"

export const ProductCard=({ image, title, description,mrp, price, id })=>{
    const [filter,setFilter]=useRecoilState(filterr)
    const nav=useNavigate();
    return (
        <>
        <div 
         className={`max-w-xs rounded-lg bg-background ${filter?'mx-3 md:mx-5 md:w-full lg:mx-4 ':''} group cursor-pointer  overflow-hidden hover:shadow-primary/40 hover:shadow-[0_0_10px] m-4 `}>
            <div className="my-auto relative">
                <img onClick={()=>{
            nav(`/product/${id}`)
         }}
          className="peer group-focus:bg-background/20 rounded-t-lg w-full mx-auto  h-40 sm:h-56 md:h-72 lg:h-64 xl:h-72 " src={image} alt={title} />
                <div className="group-hover:flex flex-col hidden  absolute -top-0 right-0 height-20 width-4">
                <div className="p-1">
                <WishList size={10} sub={false} title={title} id={id} /> 
                </div>
                <div className="p-1">
                <Cartt size={10} sub={false} id={id}/>
                </div>
            </div>
            <div
             onClick={()=>{
                nav(`/product/${id}`)
            }}
             className="py-2 text-center w-full rounded-b-lg bg-gradient-to-br from-text/20 to-text/10 via-background border-t-2">
            
                
                <div className="font-bold text-text text-xl flex justify-between mx-2 mb-2">
                    <div>{title}</div>
                        <div className="flex">
                            <p className={`text-primary  ${mrp>price?'line-through text-red-500 pt-1 pr-[6px]  text-base':'text-xl'}  `}>${mrp>price ? mrp : price}</p>
                            {price<mrp ?  <p className={`text-primary text-xl `}>${price}</p>:''}
                    </div>
                </div>
                <div className="flex justify-between mx-2">
                <p className="text-text/60  text-base mb-1">{description.substr(0,16)}{description.length>16?'...':''}</p>
                {price<mrp? <div className="bg-red-700/80 px-1  rounded  text-white/80 h-6 my-auto">SALE</div>:''}
                </div>
                {/* <p className="text-text/40 mx-2 mt-3 max-w-fit font-thin hover:text-primary flex text-sm underline-offset-2  underline mb-1" onClick={vendoor}>{vendor}</p> */}
            </div>
            </div>
        </div>
        </>
    )
}