import { useRecoilState } from "recoil"
import { filterr } from "../store/filter"
import { WishList } from "./WishList"
import { Cartt } from "./Cart"
import { useNavigate } from "react-router-dom"

export const ProductCard=({ image, title, description,mrp , vendor, stock , price, id })=>{
    const [filter,setFilter]=useRecoilState(filterr)
    const nav=useNavigate();
    return (
        <>
        <div 
         className={`max-w-xs rounded-lg max-h-fit border border-text/20 mx-auto w-full bg-background group cursor-pointer  overflow-hidden hover:shadow-primary/40 hover:shadow-[0_0_10px] m-4 `}>
            <div className="my-auto relative group">
            {price<mrp? <div className="bg-red-700 px-2 absolute z-10  rounded-br-2xl  text-white/80 py-1 my-auto">SALE</div>:''}
                <img onClick={()=>{
                    nav(`/product/${id}`)
                    }}
                    className="peer group-focus:bg-background/20 group-hover:scale-105 transition-all duration-500 rounded-3xl w-full max-h-72 mx-auto p-2 md:h-56   lg:h-64 xl:h-72 " src={image} alt={title} />
                <div className="group-hover:flex hidden absolute -top-0 right-0 height-20 width-4">
                <div className="p-1">
                <WishList size={10} sub={false} title={title} id={id} /> 
                </div>
                
            </div>
            <div className="absolute right-0 bottom-0">
                <div className="p-1">
                <Cartt size={10} quty={stock} sub={false} id={id}/>
                </div></div>
            <div
             onClick={()=>{
                nav(`/product/${id}`)
            }}
             className="py-2 text-center w-full rounded-b-lg  from-text/20 to-text/10 via-backgrounds">
            
                
                <div className="font-bold text-text text-xl flex justify-between mx-2 ">
                    <div className="flex flex-col items-start">
                    <div className="ml-2">{title}</div>
                    <div className="flex justify-between mx-2">
                <p className="text-text/60  text-base mb-1">{description.substr(0,12)}{description.length>12?'...':''}</p>
                </div>
                    </div>
                    <div className="flex">
                    <p className="text-text/40 mx-2 mt-3 max-w-fit font-thin hover:text-primary flex text-sm underline-offset-2  underline mb-1" onClick={(e)=>{e.stopPropagation()}}>by -{vendor}</p>
                    </div>

                
                
                </div>
                <div className="flex ml-4 mb-1">
                            <p className={`text-primary  ${mrp>price?'line-through text-red-500 pt-1 pr-[6px]  text-base':'text-xl'}  `}>${mrp>price ? mrp : price}</p>
                            {price<mrp ?  <p className={`text-primary text-xl `}>${price}</p>:''}
                    </div>
                
            </div>
            </div>
        </div>
        </>
    )
}