import { FaCartArrowDown, FaCartPlus } from "react-icons/fa"
import { Cart } from '../assets/Svg'
import { cartState, cartUpdate, getCart } from "../store/aCart";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export const Cartt=({size,sub,id})=>{

    const [list, setList] = useRecoilState(cartState);
    const isactive = list.includes(id);
    const ll = useRecoilValueLoadable(getCart);
      const w = useRecoilValueLoadable(cartUpdate);

    const nav=useNavigate();


    const handleClick = () => {
        setList(prev => isactive ? prev.filter(itemId => itemId !== id) : [...prev, id]);
        console.log(w)
      };

      const navigate = ( ) =>{
        nav('/your-cart');
        location.reload()
      }


      
    
      useEffect(() => {
        if (ll.state === 'hasValue' && ll.contents.qry[0].product_id) {
          setList(ll.contents.qry[0].product_id);
        }
      }, [ll]);



    return(
        <div className="flex w-14 flex-col justify-center items-center " onClick={() => { sub ? navigate() : handleClick(); }}>
        <div value='Wishlist' className={`bg-primary peer text-background hover:bg-primary/80 p-2 hover:text-text size-${size} text-4xl flex items-center justify-center rounded-full`} >
            {!sub & !isactive?<FaCartPlus title="Add to Cart"/>:<FaCartArrowDown/>}
        </div>
        <div className={`hidden ${sub?'peer-hover:flex':''} text-text text-base`}>
            Cart
        </div>
        </div>
    )
}