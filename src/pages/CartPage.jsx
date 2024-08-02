import { FaArrowLeft } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import CartPageComponent from "../components/CartPageComponent";
import { useEffect, useState } from "react";
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { products } from "../store/products";
import { themeState } from "../store/atoms";
import { cartState, cartUpdate, getCart } from "../store/aCart";

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

  useEffect(() => {
    document.body.classList = theme;
  }, [theme]);

  useEffect(() => {
    if (list.state === 'hasValue') {
      setList(list.contents.qry[0].product_id);
    }
  }, [list]);

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

  useEffect(() => {
    if (prod.state === 'hasValue' && list.state === 'hasValue') {
      let total = 0;
      prod.contents.data.forEach(item => {
        if (listt?.includes(item._id)) {
          total += parseFloat(item.price);
        }
      });
      setSub(total);
    }
  }, [prod.contents.data, listt]);

  useEffect(() => {
    setTotal((subTotal + 12.01 + 0.18 * subTotal).toFixed(2)); 
  }, [subTotal]);

  const snap = () => {
    const scrollY = window.scrollY;
    setTop(1 + scrollY );
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
      <div className="bg-background rounded-md w-full absolute h-fit min-h-screen">
        <div 
          onClick={() => navigate('/')} 
          className='border-text/50 w-12 flex justify-center relative top-12 left-12 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-primary p-1 px-2 rounded-md text-lg font-semibold'
        >
          <FaArrowLeft />
        </div>
        
        <div className='flex w-full justify-center text-4xl font-extrabold font-serif text-primary'>
          Cart
        </div>
        <div className="overflow-y-scroll p-4 w-full  grid grid-cols-2 md:grid-cols-3 ml-5 no-scroll">
          {prod.contents.data.map((item, i) => {
            const isAdded = listt?.includes(item._id);
            return isAdded ? (
              <div key={item._id} className="pr-8  col-span-2 grid-cols-1">
                <CartPageComponent 
                  title={item.name} 
                  description={item.description} 
                  price={item.price}
                  image={item.images}
                  mrp={item.mrp}
                  id={item._id}
                />
              </div>
            ) : null;
          })}
          <div className="cursor-default md:absolute  top-20 mr-5 md:w-1/3  col-span-2 md:col-span-1  right-0 h-[calc(100%-90px)] text-text/50">
            <div className="sticky flex text-lg font-medium m-2 bg-background border-2 border-text/50 hover:border-text/30 scale-[.99] hover:scale-100 rounded-md min-h-56 h-fit flex-wrap text-wrap transition-all ease-in-out duration-700" style={{ top: `${top}px` }}>
              <div className="w-full p-2 px-4 border-b-2 border-text/10">
                <div className="flex w-full justify-between px-2">
                  <div className="font-extrabold text-start text-text w-1/3">Products</div>
                  <div className="font-extrabold text-center text-text w-1/3">Price</div>
                  <div className="font-extrabold text-end text-text w-1/3">Quty.</div>
                </div>
                {prod.contents.data.map((item, i) => {
                  const isAdded = listt?.includes(item._id);
                  return isAdded ? (
                    <div key={item._id} className="flex w-full px-2 font-normal text-text/85 justify-between">
                      <div className="w-1/3 text-start">{item.name}</div>
                      <div className="w-1/3 text-center ">
                        $ <span className="font-medium ">{item.price}</span>
                      </div>
                      <div className="text-end w-1/3">X 1</div>
                    </div>
                  ) : null;
                })}
              </div>
              <div className="flex  text-text flex-col w-full p-4 pb-1 border-b-2 border-text/10">
                <span>Sub-Total: $<span className="pl-1 font-semibold">{subTotal}</span></span>
                <span>Shipping: $<span className="pl-1 font-semibold">12.01</span></span>
              </div>
              <div className="w-full flex text-text flex-col justify-between p-4 pt-0">
                <div>Total: $<span className="pl-1 font-semibold">{total}</span></div>
                <div className="w-full flex justify-end font-thin text-text/80 text-sm">**Inclusive of all TAX</div>
                <button className="bg-primary mt-4 p-2 w-full rounded-md overflow-hidden h-10 group"><div className="group-hover:-translate-y-8 transition-all duration-500 font-semibold">Check-Out</div><div className="pt-1 transition-all duration-200 group-hover:-translate-y-8 font-extrabold">Check-Out</div></button>
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
