import { FaArrowLeft, FaHeart } from "react-icons/fa";
import WishPageComponent from "../components/WishPageComponent";
import { useEffect, useState } from "react";
import { getWList, wishListState, wList } from "../store/wList";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { useNavigate } from "react-router-dom";
import { products } from "../store/products";
import { themeState } from "../store/atoms";



const WishPage = () => {
    const navigate = useNavigate();
    const wishList = useRecoilValue(wishListState);
    const prod = useRecoilValueLoadable(products);
    const theme = useRecoilValue(themeState);
    const list = useRecoilValueLoadable(getWList);
    const lst = useRecoilValueLoadable(wList);
    useEffect(()=>{
    document.body.classList=theme;    
    },[])
    useEffect(()=>{
        console.log(list.state)
        if(list.state=='hasValue'){
        console.log(list.contents);
        }
    },[list])

    useEffect(() => {
        if (prod.state === "hasValue") {
            console.log(prod.contents.data);
        }
        console.log(list)
    }, [prod]);

    if (prod.state === "loading" || list.state === 'loading') {
        return <div>Loading...</div>;
    }
    

    if (prod.state === "hasError") {
        return <div>Error loading products</div>;
    }

    if (prod.state === "hasValue" && list.state === 'hasValue') {
        return (
            <div className="bg-background rounded-md w-full absolute h-full">
                <div 
                    onClick={() => navigate('/')} 
                    className='border-text/50 w-12 flex justify-center relative top-12 left-12 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-primary p-1 px-2 rounded-md text-lg font-semibold'
                >
                    <FaArrowLeft />
                </div>
                <div className='flex w-full justify-center text-4xl font-extrabold font-serif text-primary'>
                    WishList
                </div>
                <div className="px-12 py-14 overflow-y-scroll no-scrool">
                {prod.contents.data.map((item, i) => {
            const isWishlisted = list.contents.qry[0].product_id.includes(item._id);
                    console.log(isWishlisted,item._id,list.contents.qry);
                            return isWishlisted ? (
                            <WishPageComponent 
                                key={i} 
                                title={item.name} 
                                description={item.description} 
                                price={item.price}
                                image={item.images}
                            />
                        ) : null
                })}
                    {console.log(wishList)}
                </div>
            </div>
        );
    }

    return null; 
};

export default WishPage;
