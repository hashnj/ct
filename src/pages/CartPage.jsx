import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import CartPageComponent from "../components/CartPageComponent";
import { useEffect, useState, useCallback } from "react";
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { products } from "../store/products";
import { themeState } from "../store/atoms";
import { cartState, cartUpdate, getCart } from "../store/aCart";
import { buyM } from "../store/buy";
import { BuyProcessing } from "../components/BuyProcessing";
import { cState } from "../store/cState";

const CartPage = () => {
  const navigate = useNavigate();
  const prod = useRecoilValueLoadable(products);
  const list = useRecoilValueLoadable(getCart);
  const theme = useRecoilValue(themeState);
  const [load, setLoad] = useState(true);
  const [subTotal, setSub] = useState(0);
  const [total, setTotal] = useState(0);
  const [listt, setList] = useRecoilState(cartState);
  const [top, setTop] = useState(12);
  const [buy, setBuy] = useRecoilState(buyM);
  const [ c, setC ] = useRecoilState(cState);


  useEffect(() => {
    document.body.classList = theme + ' bg-background';
  }, [theme]);

  useEffect(() => {
    if (list.state === 'hasValue') {
      setList(list.contents.qry[0].products);
    }
  }, [list]);

  console.log('refresh')

  useEffect(() => {
    const loadInterval = setInterval(() => {
      setLoad(false);
    }, 300);
    window.addEventListener('scroll', snap);
    return () => {
      clearInterval(loadInterval);
      window.removeEventListener('scroll', snap);
    };
  }, []);

  const calculateSubTotal = useCallback(() => {
    if (prod.state === 'hasValue' && list.state === 'hasValue') {
      let total = 0;
      prod.contents.data?.forEach(item => {
        const cartItem = listt.find(cItem => cItem.product_id === item._id);
        console.log(cartItem,item);
        if (cartItem && item.stock>0) {
          total += parseFloat(item.price) * cartItem.quantity;
        }
      });
      setSub(total);
    }
  }, [prod.contents.data, listt]);

  useEffect(() => {
    calculateSubTotal();
  }, [calculateSubTotal]);

  useEffect(() => {
    const extra = subTotal > 0 ? 12.01 : 0;
    setTotal((subTotal + extra + 0.18 * subTotal).toFixed(2));
  }, [subTotal]);

  const snap = () => {
    setTop(1 + window.scrollY);
  };

  const handleIncrement = (id) => {
    setList(prevList =>
      prevList.map(item =>
        item.product_id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const handleDecrement = (id) => {
    setList(prevList =>
      prevList.map(item =>
        item.product_id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  if (list.state === 'loading' || prod.state === 'loading' || load) {
    return (
      <div className="bg-background text-text text-6xl w-screen h-screen flex justify-center items-center">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    );
  }

  if (prod.state === 'hasError' || list.state === 'hasError') {
    return <div>Error loading products</div>;
  }

  if (prod.state === 'hasValue' && !load && list.state === 'hasValue') {
    return (
      <div className="bg-background rounded-md text-text w-full absolute h-fit min-h-screen">
        {buy && (
  <div className="fixed  h-screen inset-0 flex justify-center items-center z-10 backdrop-blur-sm ">
    <div className="max-w-xl w-4/5 md:w-3/5 max-h-5/6 h-5/6 border-2 border-text/10 relative bg-background rounded-lg shadow-lg">
    <BuyProcessing/>
    </div>
  </div>
)}
        <div 
          onClick={() => navigate(-1)} 
          className='border-text/50 w-12 flex justify-center relative top-12 left-12 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-primary p-1 px-2 rounded-md text-lg font-semibold'
        >
          <FaArrowLeft />
        </div>

        <div className='flex w-full justify-center cursor-default text-4xl font-extrabold font-serif text-primary'>
          Cart
        </div>
        <div className="overflow-y-scroll overflow-x-hidden p-4 w-full grid grid-cols-2 md:grid-cols-3 ml-5 no-scrool">
          {prod.contents.data?.map((item, i) => {
            const cartItem = listt.find(cItem => cItem.product_id === item._id);
            return cartItem ? (
              <div key={item._id} className="mr-7 ml-2 col-span-2 grid-cols-1">
                <CartPageComponent 
                  title={item.name} 
                  description={item.description} 
                  price={item.price}
                  image={item.images}
                  mrp={item.mrp}
                  id={item._id}
                  quty={item.stock}
                  quantity={cartItem.quantity}  
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                />
              </div>
            ) : null;
          })}

          <div className="cursor-default md:absolute top-20 mr-5 md:w-1/3 col-span-2 md:col-span-1 right-0 h-[calc(100%-90px)] text-text/50">
            <div className="sticky flex text-lg font-medium m-2 bg-background border-2 border-text/50 hover:border-text/30 scale-[.99] hover:scale-100 rounded-md min-h-56 h-fit flex-wrap text-wrap transition-all ease-in-out duration-700" style={{ top: `${top}px` }}>
              <div className="w-full p-2 px-4 border-b-2 border-text/10">
                <div className="text-center text-primary text-2xl font-serif">CART SUMMARY</div>
                <div className="flex w-full justify-between px-2">
                  <div className="font-extrabold text-start text-text w-1/3">Products</div>
                  <div className="font-extrabold text-center text-text w-1/3">Price</div>
                  <div className="font-extrabold text-end text-text w-1/3">Quty.</div>
                </div>
                {prod.contents.data?.map((item, i) => {
                  const isAdded = listt.some(i => i.product_id === item._id);
                  return isAdded ? (
                    <div key={item._id} className="flex w-full px-2 font-normal text-text/85 justify-between">
                      <div className="w-1/3 text-start">{item.name}</div>
                      <div className="w-1/3 text-center">
                        $ <span className="font-medium ">{item.price}</span>
                      </div>
                      <div className=" text-end  w-1/3">
                      <div className="">
                        X {item.stock<1?(<> 0<div className="text-xs font-thin text-red-400">
                        (out of stock)
                      </div></>):listt.find(cItem => cItem.product_id === item._id)?.quantity}
                      </div>                      
                      {/* {item.stock<1?:null} */}
                      </div>
                    </div>
                  ) : null;
                })}
              </div>
              <div className="flex text-text flex-col w-full p-4 pb-1 border-b-2 border-text/10">
                <span>Sub-Total: $<span className="pl-1 font-semibold">{subTotal}</span></span>
                <span>Shipping: $<span className="pl-1 font-semibold">{subTotal > 0 ? '12.01' : '0'}</span></span>
              </div>
              <div className="w-full flex text-text flex-col justify-between p-4 pt-0">
                <div>Total: $<span className="pl-1 font-semibold">{total}</span></div>
                <div className="w-full flex justify-end font-thin text-text/80 text-sm">**Inclusive of all TAX</div>
                <button 
                  className="bg-primary mt-4 p-2 w-full rounded-md overflow-hidden h-10 group"
                  onClick={() => {
                    setBuy(true);
                    setC(true);
                  }}
                >
                  <div className="text-background font-bold text-lg">Checkout</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CartPage;
