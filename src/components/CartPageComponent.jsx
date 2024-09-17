import { ImCross } from "react-icons/im";
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState, cartUpdate } from "../store/aCart";
import { useNavigate } from "react-router-dom";

const CartPageComponent = ({ title, description, image, price, id, mrp, quty, quantity }) => {
  const [list, setList] = useRecoilState(cartState);
  const nav = useNavigate();

  const isActive = list?.some(i => i.product_id === id);

  const plus = () => {
    setList(prevList =>
      prevList.map(item =>
        item.product_id === id && item.quantity < quty
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const minus = () => {
    setList(prevList =>
      prevList.map(item =>
        item.product_id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = () => {
    setList(prev => prev.filter(item => item.product_id !== id));
  };

  useRecoilValue(cartUpdate);

  return (
    <div className="w-full cursor-default text-text border-double grid grid-cols-3 sm:grid-cols-4 gap-2 my-3 justify-between p-2 items-center bg-background border-2 border-text/50 hover:border-text/30 hover:scale-100 scale-[.99] transition-all duration-300 rounded-md">
      <div onClick={() => { nav(`/product/${id}`) }} className="absolute z-10 min-w-full min-h-full"></div>
      <div className="flex justify-center items-center col-span-3 sm:col-span-1">
        <div className="size-36 rounded-md flex justify-center items-center overflow-hidden">
          <img src={image} alt={title} />
        </div>
      </div>
      <div className="col-span-2 h-full">
        <div className="pl-4 h-full flex flex-col justify-around items-start">
          <div className="text-3xl font-extrabold">{title}</div>
          <div className="text-lg pb-3 md:pb-5 font-thin">{description}</div>
          <div className="pr-2 text-primary font-bold flex items-center text-xl">
            {mrp > price ? (
              <div className="text-red-600 pr-1 scale-90 line-through">${mrp}</div>
            ) : null}
            <div className="scale-105">${price}</div>
          </div>
        </div>
      </div>
      <div className="flex flex-col h-full justify-around">
        <div className="flex h-10 justify-end z-20 w-full">
          <button className="p-1 pl-2 h-full text-xl bg-backgrounds font-bold rounded-l-md" onClick={minus}>-</button>
          <input 
            type="number" 
            readOnly 
            value={quantity}  
            min={1} 
            className="cursor-default focus:ring-0 focus:border-0 h-full bg-backgrounds border-none px-[2px] w-8 py-1 text-center touch-none select-none" 
          />
          <button className="p-1 text-xl bg-backgrounds h-full rounded-r-md font-bold" onClick={plus}>+</button>
        </div>
        <div title="Remove" className="text-xl p-2 z-20 pb-0 pt-4 w-full flex items-end justify-end text-red-600">
          <ImCross className="cursor-pointer" onClick={removeItem} />
        </div>
      </div>
    </div>
  );
};

export default CartPageComponent;
