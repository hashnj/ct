import { FaCartArrowDown, FaCartPlus } from "react-icons/fa";
import { cartState, cartUpdate, getCart } from "../store/aCart";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


export const Cartt = ({ size, sub, id }) => {
  const [list, setList] = useRecoilState(cartState); 
  const ll = useRecoilValueLoadable(getCart);
  const w = useRecoilValueLoadable(cartUpdate);
  const nav = useNavigate();
  let isactive = list?.some(i => i.product_id === id); 

  useEffect(() => {
    if (ll.state === 'hasValue' && ll.contents.qry) {
      setList(ll.contents.qry[0].products); 
    } else if (ll.state === 'hasError') {
      console.error("Error fetching cart", ll.contents);
    }
  }, [ll]);

  
  useEffect(() => {
    if (list.length) {
      w.contents; 
    }
    setList(list)
  }, [list]);

  const handleClick = () => {
    // Toggle product in cart
    setList(prev => 
      isactive 
        ? prev.filter(item => item.product_id !== id) 
        : [...prev, { product_id: id, quantity: 1 }]
    );
  };

  const handleNavigation = () => {
    nav('/cart');
    location.reload();
  };

  return (
    <div className="flex w-14 flex-col justify-center items-center" onClick={() => { sub ? handleNavigation() : handleClick(); }}>
      <div className={`bg-text/30 peer text-gray-800 hover:bg-text/40 p-2 hover:text-gray-950/80 size-${size} text-4xl flex items-center justify-center rounded-full`}>
        {!sub && !isactive 
          ? <FaCartPlus className={`active:scale-75 size-${size} hover:scale-95`} title="Add to Cart" /> 
          : <FaCartArrowDown className="hover:scale-95 active:scale-75" />
        }
      </div>
      <div className={`hidden ${sub ? 'peer-hover:flex' : ''} text-text text-base`}>
        Cart
      </div>
    </div>
  );
};
