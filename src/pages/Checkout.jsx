import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { Nav } from "../components/Nav";
import SideBar from "../components/SideBar";
import { sideBar } from "../store/dash";
import { CiLocationOn } from 'react-icons/ci';
import { PiEmpty } from 'react-icons/pi';
import { products } from "../store/products";
import { useEffect, useState } from "react";
import { getCart } from "../store/aCart";

export const Checkout = () => {
  const side = useRecoilValue(sideBar);
  const prod = useRecoilValueLoadable(products);
  const cart = useRecoilValue(getCart);
  const [subTotal, setSub] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (prod.state === 'hasValue' && cart.qry?.[0]?.products) {
      let total = 0;
      cart.qry[0].products.forEach(cartItem => {
        const product = prod.contents.data.find(p => p._id === cartItem.productId);
        if (product) {
          total += parseFloat(product.price) * cartItem.quantity;
        }
      });
      setSub(total);
    }
  }, [prod.contents.data, cart]);

  useEffect(() => {
    setTotal((subTotal + 12.01 + 0.18 * subTotal).toFixed(2)); 
  }, [subTotal]);

  if (prod.state === 'hasValue') {
    return (
      <div className="bg-background w-screen min-h-screen h-full ">
        <Nav />
        <SideBar />
        <div className={`${side ? 'sm:pl-60 ' : 'px-12'} w-full pt-20 h-full transition-all duration-300`}>
          <div className="w-full flex justify-center text-primary font-bold text-3xl pb-2">Checkout</div>
          <div className={`grid w-full h-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3`}>
            <div className={`col-span-1 md:col-span-2 text-xl text-text text-center w-full`}>
              <div className="text-text flex flex-col">
                <div className="font-bold flex">
                  <CiLocationOn size={28} className="text-primary " />
                  <div className="pt-1 text-lg">Selected Address</div>
                </div>
                <div className="px-2 py-1">sdgfsgdufyfdsygfffsugxc sxhgs zxgcyg x xxcx xcugbbhb hhgb hghghg gjjhjhjh hjhjhjh hjhjj</div>
              </div>
              <div className="w-full flex text-text/80 hover:text-text/90 font-semibold justify-around">
                <button className="bg-primary/50 m-2 hover:bg-primary/70 mt-4 p-2 w-full rounded-md overflow-hidden h-10 group">Change Address</button>
                <button className="bg-primary/50 m-2 hover:bg-primary/70 mt-4 p-2 w-full rounded-md overflow-hidden h-10 group">Add Address</button>
              </div>
            </div>
            <div className={`col-span-1 w-full`}>
              <div className="absolute w-full pr-10 sm:w-1/2 sm:pr-0 md:w-1/3">
                <div className="p-2 mr-1">
                  <div className="flex text-lg font-medium m-2 scale-[.99] hover:scale-100 rounded-md min-h-56 h-fit flex-wrap text-wrap transition-all ease-in-out duration-700">
                    <div className="w-full p-2 px-4 border-b-2 border-text/10">
                      <div className="text-center text-text/90 font-bold text-xl py-4 w-full">CART SUMMARY</div>
                      {subTotal > 0 ? (
                        <div className="flex w-full justify-between px-2">
                          <div className="font-bold text-start text-text/85 w-1/3">Products</div>
                          <div className="font-bold text-center text-text/85 w-1/3">Price</div>
                          <div className="font-bold text-end text-text/85 w-1/3">Quty.</div>
                        </div>
                      ) : (
                        <div className="text-text font-extrabold flex">Nothing to see here <PiEmpty className="size-8" /> </div>
                      )}
                      {cart.qry[0]?.products?.map(cartItem => {
                        const product = prod.contents.data.find(p => p._id === cartItem.productId);
                        return product ? (
                          <div key={product._id} className="flex w-full px-2 font-normal text-text/85 justify-between">
                            <div className="w-1/3 pt-1 text-start">{product.name}</div>
                            <div className="w-1/3 pt-1 text-center">
                              $ <span className="font-medium">{product.price}</span>
                            </div>
                            <div className="text-end pt-1 w-1/3">X {cartItem.quantity}</div>
                          </div>
                        ) : null;
                      })}
                    </div>
                    {subTotal > 0 ? (
                      <div className="flex text-text flex-col w-full p-4 pb-1 border-b-2 border-text/10">
                        <span>Sub-Total: $<span className="pl-1 font-semibold">{subTotal}</span></span>
                        <span>Shipping: $<span className="pl-1 font-semibold">12.01</span></span>
                      </div>
                    ) : (
                      <div className="text-text">Add something to cart</div>
                    )}
                    <div className="w-full flex text-text flex-col justify-between p-4 pt-0">
                      <div>Total: $<span className="pl-1 font-semibold">{subTotal > 0 ? total : 0}</span></div>
                      {subTotal > 0 && <div className="w-full flex justify-end font-thin text-text/80 text-sm">**Inclusive of all TAX</div>}
                      <button className="bg-primary mt-4 p-2 w-full rounded-md overflow-hidden h-10 group">
                        <div className="group-hover:-translate-y-9 transition-all duration-500 font-semibold">Proceed to Buy</div>
                        <div className="pt-1 transition-all duration-200 group-hover:-translate-y-9 font-extrabold">Proceed to Buy</div>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-2 mr-3 pl-4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
