import React, { createContext, useEffect, useState } from "react";
import ImageScroller from "../components/ImageScroller";
import { Nav } from "../components/Nav";
import { ProductCard } from "../components/ProductCard";
import { SideBar } from "../components/SideBar";
import { useRecoilValue, useRecoilState, useRecoilValueLoadable } from "recoil";
import { products } from "../store/products";
import { sideBar } from "../store/dash";
import { FilterComponent } from "../components/Filter";
import { filterr } from "../store/filter";
import { Cartt } from "../components/Cart";
import { WishList } from "../components/WishList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { themeState } from "../store/atoms";
import { Slider } from "../components/Slider";
import ProdSlider from "../components/ProdSlider";
import { Search } from "../components/Search";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import { Cart } from "../assets/Svg";

export const Main = () => {
    const [productData, setProductData] = useState([]);
    const [active, setActive] = useRecoilState(sideBar);
    const [filter, setFilter] = useRecoilState(filterr);
    const [popup, setPopup] = useState(false);
    const data = useRecoilValueLoadable(products);
    const theme = useRecoilValue(themeState);
    const [isShowing, setIsShowing] = useState(false);
    const [bestDiscountProduct, setBestDiscountProduct] = useState(null);

    const [isVisible, setIsVisible] = useState(false);

  



    const nav =useNavigate();

    useEffect(() => {
        document.body.className = theme + ' bg-background';
    }, [theme]);

    useEffect(() => {
        setPopup(true);
        setIsVisible(false);
    }, []);
    useEffect(() => {
        if (popup) {
          setTimeout(() => setIsVisible(true), 100); 
        }
        else{
            setTimeout(()=>setIsVisible(false),100);
        }
      }, [popup]);

    useEffect(() => {
        if (data.state === 'hasValue') {
            console.log(data);
            const filteredProducts = data.contents.data?.filter((prod) => parseFloat(prod.price) < parseFloat(prod.mrp));
            setProductData(filteredProducts);

            
            if (filteredProducts?.length > 0) {
                const productWithBestDiscount = filteredProducts.reduce((maxDiscountProd, currentProd) => {
                    const currentDiscount = currentProd.mrp - currentProd.price;
                    // console.log(currentDiscount);
                    const maxDiscount = maxDiscountProd.mrp - maxDiscountProd.price;
                    // console.log(maxDiscount);
                    return currentDiscount > maxDiscount ? currentProd : maxDiscountProd;
                }, filteredProducts[0]);

                setBestDiscountProduct(productWithBestDiscount); 
            }
        }
    }, [data]);
    
    

    if (data.state === 'loading') {
        return <div className="flex justify-center text-7xl items-center bg-background text-primary h-screen"><AiOutlineLoading3Quarters className="animate-spin" /></div>;
    }

    if (data.state === 'hasError') {
        return (
            <div className="flex justify-center bg-background text-text/30 font-bold items-center text-3xl h-screen">
                <Nav />
                <div>Error: {data.contents}</div>
            </div>
        );
    }

    if (data.state === 'hasValue') {
        // console.log(bestDiscountProduct)
        return (
            <div className={`flex flex-col min-h-screen h-full no-scroll justify-center items-center bg-backgrounds z-20 text-text w-full ${isVisible ? 'fixed':''}`}>
                <Nav home={false} />
                <SideBar top="Home" />

                <div className={`w-full h-full pt-20 transition-all duration-300 px-2 ${active ? 'md:pl-72 ' : 'w-full'} no-scroll`}>
                    <div className={`w-full flex-col min-h-screen transition-all  duration-300 flex h-full ${active ? '' : "px-5 sm:px-8 md:px-10 lg:px-20"} `}>
                        {popup && bestDiscountProduct && ( 
                            <div 
                                className={` ${isVisible?'backdrop-blur':''} transition-all duration-300 min-w-screen w-full z-20 min-h-screen h-fit overflow-y-scroll fixed left-0 top-0`}
                                onClick={()=>{
                                    setPopup(false);
                                    setIsVisible(false);
                                }}
                                >
                                <div 
                                    className={`bg-background  z-30  rounded-xl p-8 fixed top-32 lg:top-1/4 left-12 w-4/5 sm:left-24 md:left-1/4 sm:w-2/3  md:w-1/2 border border-text/50  transition-all duration-300 ${
                                                isVisible ? "translate-y-0 opacity-100" : "translate-y-2/4 opacity-0"}`}
                                    onClick={(e)=>e.stopPropagation()}
                                >
                                <div className="lg:flex h-full lg:flex-row-reverse w-full">
                                <div className="w-full h-full my-auto">
                                        <img className=" rounded-xl md:rounded-none" src={bestDiscountProduct.images[0]} alt="" />
                                    </div>
                                    <div className="flex w-full my-auto justify-between h-full py-2 flex-col">
                                        <div className="text-primary text-lg">Deal of the Day</div>
                                        <div className="text-2xl font-bold pb-4 px-2">
                                            {bestDiscountProduct.name} 
                                            </div>
                                            <div className="font-thin text-lg py-2">
                                                Hurry up!!! offer might end soon...
                                            </div>
                                            <div className="flex flex-row-reverse justify-between">
                                            <div className="text-sm w-full text-center py-4">
                                                <div>Stock Left: {bestDiscountProduct.stock}</div>
                                                <div className="text-red-500">{bestDiscountProduct.stock<1 ? 'Sold Out':''}</div>
                                        </div>
                                        <div className="text-primary w-full font-semibold text-2xl flex">
                                                <div className="my-auto">
                                                ${bestDiscountProduct.price} 
                                                </div>
                                                
                                            <div className="flex flex-col justify-center"> 
                                                <div className="text-yellow-400 text-sm">
                                                    {Math.trunc((bestDiscountProduct.mrp-bestDiscountProduct.price)/ bestDiscountProduct.mrp *100) }% off
                                                </div>
                                                <div className="text-red-500 text-base line-through ">
                                                    ${bestDiscountProduct.mrp}
                                                </div>
                                            </div>
                                            
                                        </div>
                                        </div>
                                        <div className="flex mt-4 h-10 flex-row-reverse justify-end">
                                        
                                        <div className="w-full mx-2 ">
                                            <button 
                                                className="flex p-2 justify-center w-full h-auto mt-2 hover:scale-95 transition-all duration-300 group bg-primary rounded-md"
                                                onClick={()=>{nav(`/product/${bestDiscountProduct._id}`)}}
                                                >
                                                <div className="font-bold my-auto">Shop Now </div> <div className="my-auto text-black group-hover:animate-pulse pl-1"><FaArrowRight/></div>
                                            </button>
                                        </div>
                                        <div className="w-full mx-2">
                                            <button className="flex p-2 w-full h-fit justify-center font-bold mx-2 mt-2 hover:scale-95 transition-all duration-300 group bg-primary rounded-md"
                                                onClick={()=>{}}
                                                >
                                                    <div className="my-auto">Add to cart</div>
                                                    <Cart/>
                                            </button>
                                        </div>
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                <div 
                                    className="absolute hover:scale-95 hover:text-text/80 transition-all duration-300 top-4 text-text/60 right-4 font-thin cursor-pointer text-xl "
                                    onClick={()=>{setPopup(false);
                                        setIsVisible(false);}}
                                >
                                    <ImCross />
                                </div>
                            </div>
                            </div>
                        )}
                        <div className={` h-96 bg-white p-4 md:px-8 justify-between rounded-lg transition-all duration-300 flex `}>
                            <div className={`flex flex-col w-full sm:w-1/2 h-full justify-center`}>
                                <div className={`md:pl-4 text-4xl transition-all duration-300 text-primary font-bold pb-3  ${active ? "" : ""} `}>Get your all E-commerce needs met at CoreCart</div>
                                <div className="w-full rounded-xl text-black border-primary text-xl flex border">
                                    <div className="w-12 flex justify-center items-center  pointer-events-none"> <FaSearch /></div>
                                    <Search />
                                </div>
                            </div>
                            <div className=""><img src="https://www.startfreshaccounting.com.au/wp-content/uploads/2022/06/e-commerce-online-stores.png" alt="" /></div>
                        </div>
                        {!data?(
                            <>
                            <div className="text-3xl py-6 underline-offset-4 underline font-serif font-bold">Featured products</div>
                        <div>
                            <ProdSlider />
                        </div>
                        <div className="w-full flex flex-col"> 
                            <div className="text-3xl py-6 underline-offset-4 underline font-serif font-bold">
                                Exclusive Deals
                            </div>
                            <div className={`grid bg-backgrounds gap-x-3 gap-y-0 transition-all mx-auto px-1 rounded-md sm:px-2 md:px-4 duration-300 float-right min-h-screen h-full ${active ? 'grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'}`}>
                                {productData?.map((product, index) => (
                                    <div key={index} className="animate-fadeInUp transition-all duration-300">
                                    <ProductCard
                                        key={index}
                                        image={product.images}
                                        title={product.name}
                                        description={product.description}
                                        vendor={product.vendor_id?.business_name || "Admin"}
                                        price={product.price}
                                        mrp={product.mrp}
                                        stock={product.stock}
                                        id={product._id}
                                    />
                                    </div>
                                ))}
                            </div>
                        </div>
                        </>):(
                            <>
                            <div className=" w-full p-8 text-xl flex justify-center items-center">
                                No Products available 
                            </div>
                        </>)}
                        
                    </div>
                </div>
            </div>
        );
    }
};
