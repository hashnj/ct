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

export const Product = () => {
    const [productData, setProductData] = useState([]);
    const [active, setActive] = useRecoilState(sideBar);
    const [filter, setFilter] = useRecoilState(filterr);
    const data = useRecoilValueLoadable(products);
    const theme = useRecoilValue(themeState);
    
    useEffect(() => {
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        if (data.state === 'hasValue') {
            setProductData(data.contents.data);
        }
    }, [data]);

    if (data.state === 'loading') {
        return (
            <div className="flex justify-center text-7xl items-center bg-background text-primary h-screen">
                <AiOutlineLoading3Quarters />
            </div>
        );
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
        <div className="flex flex-col min-h-screen h-full justify-center items-center bg-backgrounds text-text w-full">
            <Nav home={true} />
            <SideBar top="Home" />
            
            <div className={`w-full h-full transition-all duration-300 ${active ? 'pl-64' : 'w-full'}`}>
                <div className="w-full mb-2 -z-3 pt-20 mt-4 sm:mt-0 h-auto">
                    <ImageScroller images={images} />
                </div>

                <div className={`flex w-full min-h-screen h-fit bg-background transition-all duration-300 ${active ? '' : "px-5 sm:px-8 md:px-10 lg:px-20"}`}>
                    <div className={`w-1/2 sm:w-3/5 md:w-1/4 rounded-md ml-3 transition-all duration-300 my-1 mr-2 ${filter ? 'absolute w-2/5 md:w-1/5' : ''} ${active ? 'mr-1' : ''}`}>
                        <FilterComponent />
                    </div>

                    <div className={`grid bg-background gap-2 transition-all ${filter ? 'mt-20 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'} px-1 rounded-md sm:px-2 md:px-4 duration-300 min-h-screen h-full`}>
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

                    
                    <div className="flex min-h-screen max-h-full text-background">ssssss
                        <div className="absolute  h-full text-text"> 
                            <div className="sticky top-96 mt-72">
                            <div className="h-16 group relative">
                                <WishList size={14} sub={true} />
                                <div className="absolute z-10 right-16 top-1 bg-background border border-text/20 p-2 rounded-lg hidden group-hover:block">
                                    WishList
                                </div>
                            </div>
                            <div className=" group h-16 relative">
                                <Cartt size={14} sub={true} />
                                <div className="absolute z-10 right-16 top-1 bg-background border border-text/20 p-2 rounded-lg hidden group-hover:block">
                                    Cart
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
