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
    const [cart, setCart] = useState({});
    const [load, setLoad] = useState(true);
    let loadInterval;
    const [n,setN]=useState();
    const cU = useRecoilValueLoadable(cartUpdate);
    const [listt, setList] = useRecoilState(cartState);

    useEffect(() => {
        document.body.classList = theme;
    }, [theme]);

    useEffect(() => {
        if (list.state === 'hasValue') {
            setN(list.contents.qry[0]);
            setList(list.contents.qry[0].product_id); 
        }
    }, [list,load]);


    useEffect(()=>{
        if(cU.state == 'hasValue'){
        console.log(cU)
        }
    },[listt])


    useEffect(() => {
        loadInterval = setInterval(() => {
            setLoad(false);
        }, 300);
        return () => {
            clearInterval(loadInterval);
        };
    }, []);


    
    if (list.state === 'loading' || prod.state === 'loading' || load) {
        return (
            <div className="bg-background text-text text-6xl w-screen h-screen flex justify-center items-center">
                <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
        );
    }



    if (prod.state === 'hasError' || list.state === 'hasError' ) {
        return <div>Error loading products</div>;
    }

     

    if (prod.state === 'hasValue' && !load && list.state === 'hasValue') {
        return (
            <div className="bg-background rounded-md w-full absolute min-h-screen h-full">
                <div 
                    onClick={() => navigate('/')} 
                    className='border-text/50 w-12 flex justify-center relative top-12 left-12 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-primary p-1 px-2 rounded-md text-lg font-semibold'
                >
                    <FaArrowLeft />
                </div>
                <div className='flex w-full justify-center text-4xl font-extrabold font-serif text-primary'>
                    Cart
                </div>
                <div className="overflow-y-scroll p-4 w-full grid  grid-col-3 mx-4 no-scrool">
                    {prod.contents.data.map((item, i) => {
                        const isAdded = listt?.includes(item._id);
                        console.log(item);
                        return isAdded ? (
                            <div className="w-2/3 grid pr-8 col-span-2 grid-cols-1">
                            <CartPageComponent 
                                key={i} 
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
                            <div className="absolute top-18 mr-2 right-0 h-full w-1/3 text-background bg-24 ">
                                <div className="sticky flex  top-6 m-2 bg-text/50 rounded-md min-h-56 h-fit  flex-wrap text-wrap">
                                    <div className="w-full p-2 px-4 border-b-2 border-text/10">
                                        <div className="flex w-full justify-between ">
                                            <div>Product</div>
                                            <div>Price</div>
                                        </div>
                                        <div className="flex w-full justify-between ">
                                            <div>:</div>
                                            <div>:</div>
                                        </div>
                                    </div>
                                    <div className=" flex flex-col w-full p-4 pb-1 border-b-2 border-text/10">
                                        <span>Sub-Total: ${' sub-total'}</span>
                                        <span>Shipping: $ 12.01 </span>
                                    </div>
                                    <div className=" w-full flex flex-col justify-between p-4 pt-0 ">
                                        <div>Total : $ Total</div>
                                         <button className="bg-primary p-2 w-full rounded-md">Check-Out</button> </div>
                                </div>
                            </div>

                </div>
            </div>
        );
    }

    return null; 
};

export default CartPage;
