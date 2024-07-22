import React, { useEffect, useState } from "react";
import ImageScroller from "../components/ImageScroller";
import { Nav } from "../components/Nav";
import { ProductCard } from "../components/ProductCard";
import { SideBar } from "../components/SideBar";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { products } from "../store/products";
import { sideBar } from "../store/dash";
import { FilterComponent } from "../components/Filter";
import { filterr } from "../store/filter";
import { Cartt } from "../components/Cart";
import { WishList } from "../components/WishList";


const images = [
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',
    'https://jumbotail.com/wp-content/uploads/2019/07/wide-range-of-products-500px.jpg',

];

export const Main = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [productData, setProductData] = useState([]);
    const [active, setActive] = useRecoilState(sideBar);
    const [filter, setFilter] = useRecoilState(filterr);
    const data = useRecoilValueLoadable(products);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (data.state === 'hasValue') {
                    console.log(data.contents); 
                    setProductData(data.contents.data); 
                } else if (data.state === 'hasError') {
                    setError('Error loading products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Error fetching products');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [data]);

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
    }

    return (
        <div className="flex flex-col min-h-screen h-full  no-scrool justify-center items-center bg-backgrounds text-text w-full">
            <Nav  home={true}/>
            <SideBar top='Home' />
            <div className="fixed right-4 z-20 bottom-2">
                <div className="h-20">
                    <WishList size={14} sub={true} />
                </div>
                <div className="h-20">
                    <Cartt size={14} sub={true} />
                </div>
            </div>
            <div className={`w-full  h-full transition-all duration-300  ${active?'pl-64 ':'w-full'} no-scrool`}>
                <div className="w-full mb-2 -z-3 pt-20  mt-4 sm:mt-0 h-auto">
                    <ImageScroller images={images} />
                </div>
                {/* <div className="py-6">
                    <hr />
                </div> */}
                <div className={`w-full min-h-screen transition-all duration-300 flex h-full ${active?'':"px-5 sm:px-8 md:px-10 lg:px-20"}`}>
                    
                    
                    {/* <div className={`w-2/5 md:w-1/4 rounded-md ml-4 mr-2 ${active?'mr-1':''}  bg-background ${filter?'h-10':'h-full'} sticky top-20 transition-all duration-300`} onClick={()=>{setFilter(s=>!s)}}> */}
                    <div className={`w-2/5 md:w-1/4 rounded-md ml-3 transition-all duration-300 my-1 mr-2 ${filter?'absolute w-2/5 md:w-1/5':''} ${active?'mr-1':''}`}>
                    <FilterComponent/>
                    </div>
                    {/* </div> */}
                    

                <div className={`grid bg-background transition-all  ${filter?'mt-20 w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5':'grid-cols-1  sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'} px-1 rounded-md sm:px-2 md:px-4 duration-300 mx-auto float-right min-h-screen  h-full ${active?'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4'  :   ' 2xl:grid-cols-4'}`}>
                    {productData.map((product, index) => (
                        <ProductCard
                            key={index}
                            image={product.images} 
                            title={product.name} 
                            description={product.description}
                            vendor={product.vendor_id.business_name} 
                            price={product.price} 
                            mrp={product.mrp}
                        />
                    ))}
                    {/* {productData.map((product, index) => (
                        <ProductCard
                            key={index}
                            image={product.images} 
                            title={product.name} 
                            description={product.description}
                            vendor={product.vendor_id.business_name} 
                            price={product.price} 
                        />
                    ))}
                    {productData.map((product, index) => (
                        <ProductCard
                            key={index}
                            image={product.images} 
                            title={product.name} 
                            description={product.description}
                            vendor={product.vendor_id.business_name} 
                            price={product.price} 
                        />
                    ))} */}
                </div>
                
                </div>
            </div>
            <div>
                {/* {productData.map((product,i)=>{
                    console.log(product._id,i);
                })} */}
            </div>
        </div>
    );
};
