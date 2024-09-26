import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import { cartState, cartUpdate, getCart } from "../store/aCart";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Cartt = ({ size, sub, quty, id }) => {
  const [list, setList] = useRecoilState(cartState); 
  const ll = useRecoilValueLoadable(getCart);
  const w = useRecoilValueLoadable(cartUpdate);
  const nav = useNavigate();
  
  const isActive = list?.some(i => i.product_id === id); 
  const product = list.find(item => item.product_id === id);
  const quantity = product ? product.quantity : 1;

  useEffect(() => {
    if (ll.state === 'hasValue' && ll.contents.qry) {
      setList(ll.contents.qry[0].products); 
    } else if (ll.state === 'hasError') {
      console.error("Error fetching cart", ll.contents);
    }
  }, [ll]);

  // You can remove the second useEffect because the list will update automatically.
  
  const handleNavigation = () => {
    nav('/cart');
    location.reload();
  };

  const handleIncrement = () => {
    setList(prevList =>
      isActive
        ? prevList.map(item =>
            item.product_id === id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevList, { product_id: id, quantity: 1 }]
    );
  };

  const handleDecrement = () => {
    setList(prevList =>
      isActive 
      ? prevList.map(item =>
        item.product_id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ) : prevList.filter(item => item.product_id !== id)
    );
  };

  return (
    <div className="flex w-14 flex-col justify-center items-center" onClick={() => { sub ? handleNavigation() : handleIncrement(); }}>
      <div className={`peer text-gray-800 p-2 hover:text-gray-950/80 size-${size} text-4xl flex items-center justify-center rounded-full`}>
        {!sub && !isActive 
          ? <FaCartPlus className={`active:scale-75 size-${size} hover:scale-95`} title="Add to Cart" /> 
          : <div className="pr-3 ">{ sub ? <FaCartArrowDown className="hover:scale-95 active:scale-75" /> :
              <div className="flex h-8 justify-end  z-20 pr-2 w-full">
                <button className="px-1 pl-2 h-full text-xl bg-background/95 text-primary font-bold rounded-l-xl" onClick={(e) => { e.stopPropagation(); handleDecrement(); }}>-</button>
                <input 
                  type="number" 
                  readOnly 
                  value={quty < 1 ? 0 : quantity}  
                  min={1} 
                  className="cursor-default focus:ring-0 focus:border-0 h-full bg-text/80 text-background border-none px-[2px] w-8 text-center touch-none select-none" 
                />
                <button className="px-1 text-xl bg-background/95 text-primary h-full rounded-r-xl font-bold" onClick={(e) => { e.stopPropagation(); handleIncrement(); }}>+</button>
              </div>
}
            </div>
        }
      </div>
      <div className={`hidden ${sub ? 'peer-hover:flex' : ''} text-text text-base`}>
        Cart
      </div>
    </div>
  );
};
