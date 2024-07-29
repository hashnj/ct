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
        if (ll.state === 'hasValue' && ll.contents.error){
          console.log(ll.contents)
          setList('')
        }
        else if (ll.state === 'hasValue' && ll.contents.qry[0].product_id) {
          setList(ll.contents.qry[0].product_id);
        }
      }, [ll]);



    return(
        <div className="flex w-14 flex-col justify-center items-center " onClick={() => { sub ? navigate() : handleClick(); }}>
        <div value='Wishlist' className={`bg-text/30 peer text-gray-800 hover:bg-text/40 p-2 hover:text-gray-950/80 size-${size} text-4xl flex items-center justify-center rounded-full`} >
            {!sub & !isactive?<FaCartPlus className={`active:scale-75 size-${size} hover:scale-95`} title="Add to Cart"/>:<FaCartArrowDown className="hover:scale-95 active:scale-75"/>}
        </div>
        <div className={`hidden ${sub?'peer-hover:flex':''} text-text text-base`}>
            Cart
        </div>
        </div>
    )
}