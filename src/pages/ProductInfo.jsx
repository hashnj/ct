import { useRecoilValue, useRecoilValueLoadable } from "recoil"
import { themeState } from "../store/atoms"
import { useEffect } from "react"
import { Nav } from '../components/Nav'
import { FaRegHeart } from "react-icons/fa"
import { Cart } from "../assets/Svg"
import { useParams } from "react-router-dom"
import { products } from "../store/products"
import { AiOutlineLoading3Quarters } from "react-icons/ai"

const ProductInfo = () => {

    const theme = useRecoilValue(themeState);
    const prod = useRecoilValueLoadable(products);
    const { id } = useParams();

    useEffect(()=>{
        document.body.classList=theme;
    },[theme])

    useEffect(()=>{
        if(prod.state=='hasValue'){
        console.log(prod.contents.data.find((product) => product._id === id));
        }
    },[prod])


    if(prod.state === 'loading'){
        return (
            <div className="bg-background text-primary  text-6xl w-screen h-screen flex justify-center items-center">
                <AiOutlineLoading3Quarters className="animate-spin" />
            </div>
        );
    }
    if(prod.state === 'hasError'){
        return <div className="flex justify-center min-h-screen w-screen h-full items-center text-5xl text-text font-extrabold">
            Error Loading Product....
        </div>
    }


    if(prod.state === 'hasValue'){

        const product=prod.contents.data.find((product) => product._id === id);

    return(
    <div className="bg-background text-text w-full min-h-screen h-full ">
        <Nav />
        <div className="px-12 pt-12 sm:pt-24  flex w-full h-full">
            <div className=" flex flex-col sm:flex-row p-2 sm:pt-8  w-full">
            <div className=" w-full h-full flex flex-col justify-center px-2 items-center">
                <div className="flex justify-center sm:mt-24 transition-all duration-700  lg:mt-0 items-center h-2/3 lg:h-3/4 lg:w-1/2 rounded overflow-hidden w-4/5">
                    <img src={product.images[0]} alt="" />
                </div>
                <div className="h-1/5  w-full mt-10 lg:mt-5 lg:px-10 xl:px-14 flex justify-between items-center">
                    <div className="text-text/50  text-lg p-2  ">
                            <div>Product Rating:</div>
                            <div className="w-full text-2xl hover:text-text p-2 pb-0 text-center">4.3/5</div>   
                            <div className="w-full text-base font-extralight hover:text-text  text-center">x ratings</div>   
                    </div>
                    <div className="w-px bg-text/10  h-2/5"></div>
                    <div className=" text-text/50  text-lg p-2">
                                <div className="text-wrap">Quty. Remaining:</div>
                                <div className="w-full text-2xl hover:text-text p-2 text-center">{product.stock}</div>
                    </div>
                </div>
            </div>
            <div className=" w-full h-full flex justify-center px-2 md:px-0 items-center">
                <div className="w-full h-full lg:m-8 py-10 ">
                    <div className="h-2/5 px-2 flex flex-col">
                    <div className="text-primary capitalize text-5xl  py-1 font-bold">{product.name}</div>  
                    <div className="text-text font-thin text-lg px-2 py-6  h-full  flex text-wrap flex-wrap">{product.description}</div>
                    </div>
                    <div className="flex w-full  px-4 pt-16 lg:p-4 ">
                        <div className="text-primary/60 font-extrabold text-4xl">
                            ${product.price}
                        </div>
                        {product.price<product.mrp?<div className="flex justify-center items-end pl-2 text-xl text-red-600 line-through">
                            ${product.mrp}
                        </div>:''}
                    </div>       
                    <div className="mt-8">
                        <div className="flex flex-col text-xl items-center mb-6 justify-center">
                            <button className="w-11/12 transition-all duration-700 flex p-3 lg:p-4 bg-red-600 hover:bg-red-500 active:bg-red-700 m-2 justify-center items-center rounded-xl"><div>Wishlist &nbsp;</div> <FaRegHeart/></button>    
                            <button className="w-11/12 transition-all duration-700 p-3 lg:p-4 border border-primary/40 hover:border-primary m-2 rounded-xl flex justify-center items-center bg-text/5 ">Add to Cart &nbsp; <Cart size={6}/></button>    
                            <button className="w-11/12 transition-all duration-700 p-3 lg:p-4 bg-primary/60 border border-primary/10 hover:bg-primary hover:border-primary m-2 rounded-lg">Buy Now</button>    
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

export default ProductInfo







