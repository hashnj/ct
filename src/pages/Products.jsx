import React, { useEffect, useState } from "react";
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

const images = [
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
];


export const Product=()=>{
    const [productData, setProductData] = useState([]);
    const [active, setActive] = useRecoilState(sideBar);
    const [filter, setFilter] = useRecoilState(filterr);
    const data = useRecoilValueLoadable(products);
    const theme = useRecoilValue(themeState);

    const [isShowing, setIsShowing] = useState(false);

    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        if (data.state === 'hasValue') {
            setProductData(data.contents.data);
        }
    }, [data]);

    if (data.state === 'loading') {
        return <div className="flex justify-center text-7xl items-center bg-background text-primary h-screen"><AiOutlineLoading3Quarters /></div>;
    }

    if (data.state === 'hasError') {
        return (
            <div className="flex justify-center bg-background text-text/30 font-bold items-center text-3xl h-screen">
                <Nav />
                <div>Error: {data.contents}</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen h-full no-scroll justify-center items-center bg-backgrounds text-text w-full">
            <Nav home={true} />
            <SideBar top="Home" />
            <div className="fixed right-4 z-30 bottom-2">
                <div className="h-20">
                    <WishList size={14} onMouseEnter={() => setIsShowing(true)} onMouseLeave={() => setIsShowing(false)} sub={true} />
                    {isShowing && (
                        <div className="isShowing absolute z-10 right-16 top-1 bg-background border border-text/20 p-2 rounded-lg">
                            WishList
                        </div>
                    )}
                </div>
                <div className="h-20">
                    <Cartt size={14} sub={true} />
                </div>
            </div>
            <div className={`w-full h-full transition-all duration-300 ${active ? 'pl-64' : 'w-full'} no-scroll`}>
                <div className="w-full mb-2 -z-3 pt-20 mt-4 sm:mt-0 h-auto">
                    <ImageScroller images={images} />
                </div>
                <div className={`w-full min-h-screen transition-all duration-300 flex h-full ${active ? '' : "px-5 sm:px-8 md:px-10 lg:px-20"}`}>
                    <div className={`w-2/5 md:w-1/4 rounded-md ml-3 transition-all duration-300 my-1 mr-2 ${filter ? 'absolute w-2/5 md:w-1/5' : ''} ${active ? 'mr-1' : ''}`}>
                        <FilterComponent />
                    </div>
                    <div className={`grid bg-background transition-all ${filter ? 'mt-20 w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'} px-1 rounded-md sm:px-2 md:px-4 duration-300 float-right min-h-screen h-full ${active ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : '2xl:grid-cols-4'}`}>
                        {productData.map((product, index) => (
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
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
