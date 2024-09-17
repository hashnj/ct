import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { themeState } from "../store/atoms";
import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { FaHeart, FaPlus, FaRegHeart } from "react-icons/fa";
import { Cart } from "../assets/Svg";
import { useNavigate, useParams } from "react-router-dom";
import { products } from "../store/products";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { wishListState } from "../store/wList";
import SideBar from "../components/SideBar";
import { sideBar } from "../store/dash";
import { cartState, cartUpdate, getCart } from "../store/aCart";
import details from "../hooks/details";
import auth from "../hooks/auth";
import { ImCross } from "react-icons/im";

const ProductInfo = () => {
  const theme = useRecoilValue(themeState);
  const prod = useRecoilValueLoadable(products);
  const { id } = useParams();
  const [list, setList] = useRecoilState(wishListState);
  const car = useRecoilValueLoadable(getCart);
  const [cart, setCart] = useRecoilState(cartState);
  const w = useRecoilValueLoadable(cartUpdate);
  const isactive = list.includes(id);
  const nav = useNavigate();
  const side = useRecoilValue(sideBar);
  const [buy, setBuy] = useState(false);
  const detailss = details();
  const ath = auth();
  const user = detailss?.users.filter((i) => i._id == ath.userId);
  const address = user[0].addresses;
  const [add, setAdd] = useState(false);
  const [quantity,setQuantity] = useState(1);



  useEffect(() => {
    document.body.classList = theme;
  }, [theme]);

  useEffect(() => {
    if (car.state === "hasValue" && car.contents.qry) {
      setCart(car.contents.qry[0].products);
    } else if (car.state === "hasError") {
      console.error("Error fetching cart", car.contents);
    }
  }, [car]);

  useEffect(() => {
    if (cart.length) {
      w.contents; // Trigger backend update
    }
  }, [cart]);

  const handleClick = () => {
    setList((prev) =>
      isactive ? prev.filter((itemId) => itemId !== id) : [...prev, id]
    );
  };

  const handleClickCart = () => {
    const isAdded = cart?.some((cartItem) => cartItem.product_id === id);

    setCart((prev) => {
      if (isAdded) {
        return prev.filter((cartItem) => cartItem.product_id !== id);
      } else {
        return [...prev, { product_id: id, quantity: 1 }];
      }
    });
  };

  if (prod.state === "loading") {
    return (
      <div className="bg-background text-primary text-6xl w-screen h-screen flex justify-center items-center">
        <AiOutlineLoading3Quarters className="animate-spin" />
      </div>
    );
  }

  if (prod.state === "hasError") {
    return (
      <div className="flex justify-center min-h-screen w-screen h-full items-center text-5xl text-text font-extrabold">
        Error Loading Product....
      </div>
    );
  }

  if (prod.state === "hasValue") {
    const product = prod.contents.data.find((product) => product._id === id);
    const isactivee = cart.some((item) => item.product_id === product._id); // Cart active check

    return (
      <div
        className={`bg-background text-text w-full min-h-screen h-full ${
          buy ? "overflow-hidden" : ""
        }`}
      >
        {buy && (
          <div className="fixed inset-0 flex justify-center items-center z-20 bg-black bg-opacity-50">
            <div className="max-w-xl w-4/5 md:w-3/5 h-4/5  border-2 border-text/10 relative bg-background rounded-lg shadow-lg">
              <div className="flex justify-between p-6 border-b-2 items-center border-text/10 font-serif font-bold  mb-6">
                <div ><div className="text-3xl">Processing...</div><div className="text-sm pt-1">Please Verify Your Information.</div> </div>
                <ImCross
                  className="cursor-pointer text-3xl hover:text-primary/30 active:text-primary"
                  onClick={() => setBuy(false)} 
                />
              </div>

              <div className="overflow-y-scroll p-2 pt-0 no-scrool">
              <div>Product :</div>
                <div className="flex justify-between px-1 text-2xl text-primary">
                    <div>{product.name}</div>
                    <div>${product.price}</div>
                </div>
                <div className="px-1 py-2 flex justify-between text-xl">
                    <div>Quantity</div>
                    {/* <div>{quantity}</div> */}
                    <div><div className="flex h-10 justify-end z-20 w-full">
          <button className="p-1 pl-2 h-full text-xl bg-backgrounds font-bold rounded-l-md" onClick={()=>{setQuantity(p=>p>1?p-1:p);}}>-</button>
          <input 
            type="number" 
            readOnly 
            value={quantity}  
            min={1} 
            className="cursor-default focus:ring-0 focus:border-0 h-full bg-backgrounds border-none px-[2px] w-8 py-1 text-center touch-none select-none" 
          />
          <button className="p-1 text-xl bg-backgrounds h-full rounded-r-md font-bold" onClick={()=>{setQuantity(p=>p<product.stock?p+1:p)}}>+</button>
        </div>
        </div>
                    </div>
                <div className="text-lg flex flex-col">
                    <div className={`${add?'block':'flex justify-between'}`}>
                  <div className="h-full mt-3 pl-1 text-xl">Add Address :</div>
                  {add ? (
                    <div className="block">
                      <input
                        className="w-full focus:ring-primary focus:border-none active:ring-primary focus:ring-2 bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value="l"
                        required
                      />
                      <div className="w-full flex justify-around text-xl">
                        <button
                          className="focus:ring-primary h-10 mx-1 w-full focus:border-none active:ring-primary focus:ring-2 bg-backgrounds/50  pb-1 px-4 mb-2 border rounded"
                          onClick={() => setAdd(false)}
                        >
                          Cancel
                        </button>
                        <button className="bg-primary w-full mx-1 h-10 pb-1 px-4 rounded mb-2">
                          Add
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="p-1  m-2 rounded-xl group border-2 active:border-primary flex justify-center items-center  w-2/5 text-3xl cursor-pointer hover:border-primary/30"
                      onClick={() => setAdd(true)}
                    >
                      <FaPlus  className="group-hover:text-primary/30 group-active:text-primary"/>
                    </div>
                  )}
                  </div>
                  <div className="flex">
                  <div className="h-px mx-1 mt-2 w-full border"></div>
                  <div className="text-sm text-center" >OR</div>
                  <div className="h-px mx-1 mt-2 w-full border"></div></div>
                  <div className="text-xl pl-1">Choose Address :</div>
                  <select
                    name="address"
                    id="ad"
                    className="w-full focus:ring-primary mt-2 focus:border-none active:ring-primary focus:ring-2 bg-backgrounds p-2 mb-2 border-text/5 rounded"
                  >
                    <option className="text-text/30" value="select">
                      Select Address
                    </option>
                    {address.map((ad) => (
                      <option key={ad} value={ad}>
                        {ad}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex justify-end flex-col p-2 mt-6">
                <button className="bg-primary  p-2 w-full my-1 rounded-md overflow-hidden h-10 group">
                  <div className="group-hover:-translate-y-8 transition-all duration-500 ">
                    Proceed to Pay
                  </div>
                  <div className="pt-2 transition-all duration-200 group-hover:-translate-y-8 font-extrabold">
                    Proceed to Pay
                  </div>
                </button>
                <button className="bg-primary  p-2 w-full my-1 rounded-md overflow-hidden h-10 group">
                  <div className="group-hover:-translate-y-8 transition-all duration-500 ">
                    Add to Cart
                  </div>
                  <div className="pt-2 transition-all duration-200 group-hover:-translate-y-8 font-extrabold">
                    Add to Cart
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        <Nav />
        <SideBar />
        <div
          className={`px-12 pt-12 transition-all duration-300 sm:pt-24 ${
            side ? "sm:pl-60 " : ""
          } flex w-full h-full`}
        >
          <div className="flex flex-col sm:flex-row p-2 sm:pt-8 w-full">
            <div className="w-full h-full flex flex-col justify-center px-2 items-center">
              <div className="flex justify-center sm:mt-24 transition-all duration-700 lg:mt-0 items-center h-2/3 lg:h-3/4 lg:w-1/2 rounded overflow-hidden w-4/5">
                <img src={product.images[0]} alt={product.name} />
              </div>
              <div className="h-1/5 w-full mt-10 lg:mt-5 lg:px-10 xl:px-14 flex justify-between items-center">
                <div className="text-text/50 text-lg p-2">
                  <div>Product Rating:</div>
                  <div className="w-full text-2xl hover:text-text p-2 pb-0 text-center">
                    4.3/5
                  </div>
                  <div className="w-full text-base font-extralight hover:text-text text-center">
                    x ratings
                  </div>
                </div>
                <div className="w-px bg-text/10 h-2/5"></div>
                <div className="text-text/50 text-lg p-2">
                  <div className="text-wrap">Qty. Remaining:</div>
                  <div className="w-full text-2xl hover:text-text p-2 text-center">
                    {product.stock}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-full flex justify-center px-2 md:px-0 items-center">
              <div className="w-full h-full lg:m-8 py-10">
                <div className="h-2/5 px-2 flex flex-col">
                  <div className="text-primary capitalize text-5xl py-1 font-bold">
                    {product.name}
                  </div>
                  <div className="text-text font-thin text-lg px-2 py-6 h-full flex text-wrap flex-wrap">
                    {product.description}
                  </div>
                </div>
                <div className="flex w-full px-4 pt-6 lg:p-4">
                  <div className="text-primary/60 font-extrabold text-4xl">
                    ${product.price}
                  </div>
                  {product.price < product.mrp && (
                    <div className="flex justify-center items-end pl-2 text-xl text-red-600 line-through">
                      ${product.mrp}
                    </div>
                  )}
                </div>

                <div className="mt-8">
                  <div className="flex flex-col text-xl items-center mb-6 justify-center">
                    <button
                      className="w-11/12 transition-all flex p-3 lg:p-4 bg-red-600 hover:bg-red-500 active:bg-red-700 m-2 justify-center items-center rounded-xl"
                      onClick={handleClick}
                    >
                      <div>Wishlist{isactive ? "ed" : ""} &nbsp;</div>
                      {isactive ? (
                        <FaHeart className="scale-105 transition-all" />
                      ) : (
                        <FaRegHeart className="ml-5 scale-95" />
                      )}
                    </button>
                    <button
                      className="w-11/12 transition-all duration-700 p-3 lg:p-4 border border-primary/40 hover:border-primary m-2 rounded-xl flex justify-center items-center bg-text/5"
                      onClick={handleClickCart}
                    >
                      Add{isactivee ? "ed" : ""} to Cart &nbsp;{" "}
                      <Cart size={6} />
                    </button>
                    <button
                      className="w-11/12 transition-all duration-700 p-3 lg:p-4 bg-primary/60 border border-primary/10 hover:bg-primary hover:border-primary m-2 rounded-lg"
                      onClick={() => setBuy(true)}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProductInfo;
