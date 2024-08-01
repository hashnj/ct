import { ImCross } from "react-icons/im";
import { useRecoilState } from 'recoil'
import { cartState } from "../store/aCart";
import { useState } from "react";
const CartPageComponent = ({ title, description, image, price, id,mrp }) => {
  const [list,setList] = useRecoilState(cartState)
  const [quantity , setQuantity] = useState(1)
  const isactive = list.includes(id);
  const plus = () => {setQuantity(q=>q+1)}
  const minus = () => {setQuantity(q=>q>1?q-1:q)}
  const removeItem=()=>{
    console.log(id)
    setList(prev => isactive ? prev.filter(itemId => itemId !== id) : [...prev, id]);

  }
  return (
  <div className="w-full cursor-default text-text border-double border-text grid  grid-col-3 sm:grid-cols-4 gap-2 my-3 justify-between p-2 items-center bg-backgrounds/90 rounded-md">
    <div className="flex justify-center items-center col-span-3 sm:col-span-1">
      <div className="size-36 rounded-md flex justify-center items-center overflow-hidden">
        <img src={image} alt="" />
      </div>
      </div>
      <div className="col-span-2 h-full">
      <div className="pl-4 h-full flex flex-col justify-around items-start ">
        <div className="text-3xl  font-extrabold">{title}</div>
        <div className="text-lg pb-3 md:pb-5 font-thin">{description}</div>
        
        <div className="pr-2 text-primary font-bold flex items-center text-xl">
          {mrp > price ? <div className="text-red-600 pr-1 scale-90 line-through">${mrp}</div> : null} <div className="scale-105">${price}</div>
        </div>
      </div>
    </div>
    <div className="flex flex-col h-full justify-around ">
      {/* <div className="pr-2 text-primary font-bold drop-shadow-[1px_1px_1px_rgb(225,225,225)] text-xl">
        {mrp&& mrp<price ? <div className="">${mrp}</div> : ''}${price}
      </div> */}
      <div className="flex h-10 justify-end w-full">
        <button className="p-1 pl-2 h-full  text-xl bg-background rounded-l-md" onClick={minus}>-</button>
        <input type="number" readOnly value={quantity} min={0} className=" cursor-default focus:ring-0 focus:border-0 h-full bg-background border-none px-[2px] w-8 py-1 text-center touch-none select-none " />
        <button className="p-1 text-xl bg-background h-full rounded-r-md" onClick={plus}>+</button>

      </div>
      <div title="Remove" className="text-xl p-2 pb-0 pt-4 w-full flex items-end justify-end text-red-600">
        <ImCross className="cursor-pointer"  onClick={()=>{
          removeItem()
        }}/>
      </div>
    </div>
  </div>
  );
};

export default CartPageComponent;

{/***/}