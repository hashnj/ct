import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { buyM } from "../store/buy";
import { ImCross } from "react-icons/im";
import { products } from "../store/products";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import details from "../hooks/details";
import auth  from "../hooks/auth";
import { AddAddress } from "./AddAddress";
import { addAddress } from "../store/addAddress";

export const BuyProcessing = ( ) =>{


  const [buy, setBuy] = useRecoilState(buyM);
  const { id } = useParams();
  const [quantity,setQuantity] = useState(1);
  const [add, setAdd] = useRecoilState(addAddress);

  const prod = useRecoilValueLoadable(products);
  if(prod.state === 'hasValue'){
  const product = prod.contents.data.find((product) => product._id === id);
  const detailss = details();
  const ath = auth();
  const user = detailss?.users.filter((i) => i._id == ath.userId);
  console.log(detailss);
  const address = detailss.address;
  useEffect(()=>{
  console.log(address)
  },[add]);

  return (
<div className="bg-background h-full">
      <div className="flex justify-between p-3 border-b-2 items-center border-text/10 font-serif font-bold mb-4">
        <div>
          <div className="text-3xl">Processing...</div>
          <div className="text-sm pl-px font-thin font-sans">Please Verify the Information.</div>
        </div>
        <ImCross
          className="cursor-pointer text-3xl hover:text-primary/70 active:text-primary"
          onClick={() => setBuy(false)} 
        />
      </div>


      <div className="overflow-y-auto no-scrool px-2 pt-0 h-[75%]">  
        {/* <div className="pl-2 underline-offset-2 underline">Product:</div> */}

        <div className="flex justify-between px-1 py-3 text-2xl text-primary">
          <div className=" text-3xl">{product.name}</div>
          <div>${product.price}</div>
        </div>

        <div className="px-1 py-3 flex justify-between text-xl">
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
        </div>

        <div className="text-lg flex flex-col">
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

          <div className="text-xl pl-1">Choose Address:</div>
          <select
            name="address"
            id="ad"
            className="w-full focus:ring-primary mt-2 focus:border-none active:ring-primary focus:ring-2 bg-backgrounds p-2 mb-2 border-text/5 hover:text-primary rounded"
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
            onClick={()=>{}}
          >
            <div className="group-hover:-translate-y-8 transition-all duration-500">Proceed to Pay</div>
            <div className="pt-2 transition-all duration-200 group-hover:-translate-y-8 font-extrabold">Proceed to Pay</div>
          </button>
          <button 
            className="bg-primary p-2 w-full my-1 rounded-md overflow-hidden h-10 group"
            onClick={()=>{}}
          >
            <div className="group-hover:-translate-y-8 transition-all duration-500">Proceed with Cart</div>
            <div className="pt-2 transition-all duration-200 group-hover:-translate-y-8 font-extrabold">Proceed with Cart</div>
          </button>
        </div>
      </div>
      <div className="font-thin text-text/40  flex justify-center ">(scrool down)</div>
    </div>
  )
} }