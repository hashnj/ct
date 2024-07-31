import { ImCross } from "react-icons/im";
import { useRecoilState } from 'recoil'
import { cartState } from "../store/aCart";
const CartPageComponent = ({ title, description, image, price, id,mrp }) => {
  const [list,setList] = useRecoilState(cartState)
  const isactive = list.includes(id)
  const removeItem=()=>{
    console.log(id)
    setList(prev => isactive ? prev.filter(itemId => itemId !== id) : [...prev, id]);

  }
  return (
  <div className="w-full border-double border-text grid  grid-col-3 md:grid-cols-4 gap-2 my-3 justify-between p-2 items-center bg-text/50 rounded-md">
    <div className="flex justify-center items-center col-span-3 md:col-span-1">
      <div className="size-36 rounded-md flex justify-center items-center overflow-hidden">
        <img src={image} alt="" />
      </div>
      </div>
      <div className="col-span-2 h-full">
      <div className="pl-4 h-full flex flex-col items-start ">
        <div className="text-3xl font-extrabold">{title}</div>
        <span className="text-lg font-thin">{description}</span>
        
        <div className="pr-2 text-primary font-bold drop-shadow-[1px_1px_1px_rgb(225,225,225)] flex items-center text-xl">
          {mrp > price ? <div className="text-red-600 scale-90 line-through">${price}</div> : null} <div className="scale-105">${price}</div>
        </div>
      </div>
    </div>
    <div className="flex flex-col ">
      {/* <div className="pr-2 text-primary font-bold drop-shadow-[1px_1px_1px_rgb(225,225,225)] text-xl">
        {mrp&& mrp<price ? <div className="">${mrp}</div> : ''}${price}
      </div> */}
      <div className="flex items-center">
        <button className="p-1 px-2 text-xl bg-text/60 rounded-md">-</button>
        <input type="text" className=" w-8 p-1" />
        <button className="p-1 text-xl bg-text/60 rounded-md">+</button>

      </div>
      <div title="Remove" className="text-xl  text-red-600">
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