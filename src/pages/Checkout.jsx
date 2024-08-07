import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import { Nav } from "../components/Nav"
import SideBar from "../components/SideBar"
import { sideBar } from "../store/dash"
import { CiLocationOn } from 'react-icons/ci'
import { products } from "../store/products"
import { useEffect, useState } from "react"

export const Checkout = () =>{
  const side = useRecoilValue(sideBar);
  const prod = useRecoilValueLoadable(products);
  const [subTotal, setSub] = useState(0);
  const [total, setTotal] = useState(0);



  useEffect(() => {
    if (prod.state === 'hasValue' ) {
      let total = 0;
      prod.contents.data.forEach(item => {
        if (prod.contents.data?.includes(item._id)) {
          total += parseFloat(item.price);
        }
      });
      setSub(total);
    }
  }, [prod.contents.data]);

  useEffect(() => {
    setTotal((subTotal + 12.01 + 0.18 * subTotal).toFixed(2)); 
  }, [subTotal]);



  if(prod.state === 'hasValue'){
  return(
    <div className="bg-background w-screen min-h-screen h-full ">
      <Nav/>
      <SideBar/>
      <div className={`${side?'sm:pl-60 ':'px-12'} w-full pt-20 h-full transition-all duration-300`}>
        <div className="w-full flex justify-center text-primary font-bold text-3xl pb-2">Checkout</div>
        <div className={`grid w-full h-full  grid-cols-3`} >
          <div className={`col-span-2 bg-sky-500 text-xl text-text text-center w-full `}>list</div>
          <div className={`col-span-1  w-full `}>
            <div className="absolute w-1/3">
            <div className="p-2">
              <div className="flex text-lg font-medium m-2 scale-[.99] hover:scale-100 rounded-md min-h-56 h-fit flex-wrap text-wrap transition-all ease-in-out duration-700">
              <div className="w-full p-2 px-4 border-b-2 border-text/10">
                <div className="flex w-full justify-between px-2">
                  <div className="font-extrabold text-start text-text w-1/3">Products</div>
                  <div className="font-extrabold text-center text-text w-1/3">Price</div>
                  <div className="font-extrabold text-end text-text w-1/3">Quty.</div>
                </div>
                {prod.contents.data.map((item, i) => {
                  const isAdded = prod.contents.data?.includes(item._id);
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
          </div></div>
            <div className="p-2 pl-4   ">
              <div className="text-text">
                <CiLocationOn size={28}/> Selected Address
                <div>sdgfsgdufyfdsygfffsugxc sxhgs zxgcyg x xxcx xcugbbhb hhgb hghghg gjjhjhjh hjhjhjh hjhjj</div>
                </div>
                
                </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  )
}
}