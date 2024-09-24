import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { buyM } from "../store/buy";
import { ImCross } from "react-icons/im";
import { products } from "../store/products";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import details from "../hooks/details";
import auth  from "../hooks/auth";
import { AddAddress } from "./AddAddress";
import { addAddress } from "../store/addAddress";
import { B_Url } from "../config";
import { address } from "../store/address";
import { cartState } from "../store/aCart";
import { themeState } from "../store/atoms";
import { cState } from "../store/cState";

export const BuyProcessing = ( ) =>{

  const nav = useNavigate();

  const [buy, setBuy] = useRecoilState(buyM);
  const { id } = useParams();
  const [quantity,setQuantity] = useState(1);
  const [add, setAdd] = useRecoilState(addAddress);
  const [ cart,setCart ] = useRecoilState(cartState);
  const [sa,setSelectedAddress] = useState('');
  const theme =useRecoilValue(themeState)
  const prod = useRecoilValueLoadable(products);
  const [ c, setC ] = useRecoilState(cState);


  useEffect(() => {
    document.body.classList = theme + ' bg-background';
  }, [theme]);


  if(prod.state === 'hasValue'){
  const product = prod.contents.data.find((product) => product._id === id);
  const detailss = details();
  const ath = auth();
  const user = detailss?.users.filter((i) => i._id == ath.userId);
  console.log(detailss);
  const address = detailss.address;
  useEffect(()=>{
  console.log(address ,product)
  },[add]);

  async function buyF(){
    try {
      if(sa){
      const res = await fetch(`${B_Url}/order/buy`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": localStorage.getItem('token')
        },
      body:JSON.stringify({quantity,product:product._id,price:product.price,address:{address:sa.rel,postal_code:sa.postal_code,city:sa.city,state:sa.state,country:sa.country}})

  });
  console.log(product.name);

  const data = await res.json();

  if (data) {
    const orderId = data.order._id; 
    nav(`/order/${orderId}`);
  }}
  else{
    console.log('select address');
  }
} catch (error) {
  console.error("Error:", error);
}
}


  async function buyC(){
    try {
      if(sa){
      const res = await fetch(`${B_Url}/order/buy`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "authorization": localStorage.getItem('token')
        },
      body:JSON.stringify({quantity,product:product._id,price:product.price,address:{address:sa.rel,postal_code:sa.postal_code,city:sa.city,state:sa.state,country:sa.country}})

  });
  console.log(product.name);

  const data = await res.json();

  if (data) {
    const orderId = data.order._id; 
    nav(`/order/${orderId}`);
  }}
  else{
    console.log('select address');
  }
} catch (error) {
  console.error("Error:", error);
}
}

async function cartF() {
  const includes = cart.some(item => item.product_id === product._id); 
  
  setCart(prev => 
    includes 
      ? prev.map(item => item.product_id === product._id 
          ? { ...item, quantity: item.quantity + 1 }  
          : item
        )
      : [...prev, { product_id: product._id, quantity: 1 }] 
  );
  nav('/cart')
}

  return (
<div className="bg-background h-full">
      <div className="flex justify-between p-3 border-b-2 items-center border-text/10 font-serif font-bold mb-4">
        <div>
          <div className="text-3xl">Processing...</div>
          <div className="text-sm pl-px font-thin font-sans">Please Verify the Information.</div>
        </div>
        <ImCross
          className="cursor-pointer text-3xl hover:text-primary/70 active:text-primary"
          onClick={() => {
            setBuy(false)
            setC(false)
          }} 
        />
      </div>


      <div className="overflow-y-auto no-scrool px-2 pt-0 h-[75%]">  
        <div className="pl-2 underline-offset-2 text-xl underline">Product:</div>

        {c?(prod.contents.data.map((item, i) => {
                  const isAdded = cart.some(i => i.product_id === item._id);
                  return isAdded ? (
                    <div key={item._id} className="flex text-xl w-full px-2 font-normal text-text/85 justify-between">
                      <div className="w-1/3 text-primary text-2xl text-start">{item.name}</div>
                      <div className="w-1/3 text-center">
                        $ <span className="font-medium ">{item.price}</span>
                      </div>
                      <div className="text-end text-text/70 text-thin w-1/3">X {cart.find(cItem => cItem.product_id === item._id)?.quantity}</div>
                    </div>
                  ) : null;
                })):
                <div className="flex justify-between px-1 py-3 text-2xl text-primary">
          <div className=" text-3xl">{product.name}</div>
          <div>${product.price}</div>
        </div>}

        {c ? null: <div className="px-1 py-3 flex justify-between text-xl">
          <div>Quantity</div>
          <div className="flex h-10 justify-end z-20 w-full">
            <button
              className="p-1 pl-2 h-full text-xl bg-backgrounds font-bold rounded-l-md"
              onClick={() => setQuantity((p) => (p > 1 ? p - 1 : p))}
            >
              -
            </button>
            <input
              type="number"
              readOnly
              value={quantity}
              min={1}
              className="cursor-default focus:ring-0 focus:border-0 h-full bg-backgrounds border-none px-[2px] w-8 py-1 text-center"
            />
            <button
              className="p-1 text-xl bg-backgrounds h-full rounded-r-md font-bold"
              onClick={() => setQuantity((p) => (p < product.stock ? p + 1 : p))}
            >
              +
            </button>
          </div>
        </div>}

        <div className="text-lg pt-4 flex flex-col">
          <div className={`${add ? 'block' : 'flex justify-between'}`}>
            <div className={`h-full mt-3 pl-1 text-xl underline-offset-2 ${add?'underline pb-1':''}`}>Add Address:</div>
            {add ? (
              <AddAddress/>
            ) : (
              <div
                className={`block ${add ? 'opacity-0' : 'opacity-100'} transition-all duration-100 p-1 m-2 rounded-xl group border-2 active:border-primary flex justify-center items-center w-2/5 text-3xl cursor-pointer hover:border-primary/30`}
                onClick={() => setAdd(true)}
              >
                <FaPlus className="group-hover:text-primary/30 group-active:text-primary" />
              </div>
            )}
          </div>

          <div className="flex">
            <div className="h-px mx-1 mt-3 w-full border"></div>
            <div className="text-sm  text-center">OR</div>
            <div className="h-px mx-1 mt-3 w-full border"></div>
          </div>

          <div className="underline-offset-2 text-xl underline pl-1">Choose Address:</div>
          <select
            name="address"
            id="ad"
            className="w-full focus:ring-primary mt-2 focus:border-none active:ring-primary focus:ring-2 bg-backgrounds p-2 mb-2 border-text/5 hover:text-primary rounded"
            onChange={(e)=>{
              console.log(address[e.target.value]);
              setSelectedAddress(address[e.target.value])
            }}
          >
            <option className="text-text/30 bg-background  hover:text-primary" defaultChecked value="select">
              Select Address
            </option>
            {address.map((ad,i) => (
              <option key={i} value={i} className="hover:text-primary">
                {ad.postal_code }, {ad.ref}, {ad.city}, {ad.state}, {ad.country}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end flex-col p-2 mt-6">
          <button 
            className="bg-primary p-2 w-full my-1 rounded-md overflow-hidden h-10 group"
            onClick={buyF}
          >
            <div className="group-hover:-translate-y-8 transition-all duration-500" >Proceed to Pay</div>
            <div className="pt-2 transition-all duration-200 group-hover:-translate-y-8 font-extrabold">Proceed to Pay</div>
          </button>
          {c?null:<button 
            className="bg-primary p-2 w-full my-1 rounded-md overflow-hidden h-10 group"
            onClick={cartF}
          >
            <div className="group-hover:-translate-y-8 transition-all duration-500">Proceed with Cart</div>
            <div className="pt-2 transition-all duration-200 group-hover:-translate-y-8 font-extrabold">Proceed with Cart</div>
          </button>}
        </div>
      </div>
      <div className="font-thin text-text/40  flex justify-center ">(scrool down)</div>
    </div>
  )
} }