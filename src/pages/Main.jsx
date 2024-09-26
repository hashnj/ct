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




export const Main = () => {
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
        return <div className="flex justify-center text-7xl items-center bg-background text-primary h-screen"><AiOutlineLoading3Quarters className="animate-spin"/></div>;
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
        <div className="flex flex-col min-h-screen h-full no-scroll justify-center items-center bg-backgrounds z-20 text-text w-full">
            <Nav home={true} />
            <SideBar top="Home" />
            
            <div className={`w-full h-full pt-20 transition-all duration-300 ${active ? 'pl-64' : 'w-full'} no-scroll`}>
                <div className={`w-full flex-col min-h-screen transition-all duration-300 flex h-full ${active ? '' : "px-5 sm:px-8 md:px-10 lg:px-20"}`}>
                    <div className={`w-full pr-16 md:w-1/4 pl-4 sticky top-20 rounded-md  ml-3 transition-all duration-300 my-1 mr-2  ${active ? 'mr-1 pr-72' : ''}`}>
                    
                    </div>
                    {/* <div className={`grid bg-backgrounds transition-all ${filter ? 'mt-20 w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5' : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'} px-1 rounded-md sm:px-2 md:px-4 duration-300 float-right min-h-screen h-full ${active ? 'grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4' : '2xl:grid-cols-4'}`}>
                        {productData.map((product, index) => (
                            <ProductCard
                                key={index}
                                image={product.images}
                                title={product.name}
                                description={product.description}
                                vendor={product.vendor_id?.business_name || "Admin"}
                                price={product.price}
                                mrp={product.mrp}
                                id={product._id}
                            />
                        ))}
                    </div> */}
                    <div className="text-3xl font-serif font-bold">Featured products</div>
                </div>
            </div>
        </div>
    );
};



 <div class="carousel" id="test2">
	<input type="radio" name="item2" value="1" checked />
	<div>
    <img src="https://th.bing.com/th/id/R.7383028831604862ec47fefee3e8f43f?rik=JvqjDCfPocchLg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fimages-of-nature-4.jpg&ehk=%2b1REJDS0cEPD0z2IP%2fddCyP9IgFz6xVpp8fyQr78SJ0%3d&risl=&pid=ImgRaw&r=0" />
	</div>
	<input type="radio" name="item2" value="2" />
	<div>
     <img src="https://th.bing.com/th/id/R.3d88a927f8529dcba03364b09d98adbe?rik=JYmQaMVSULpYQg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images.jpg&ehk=BNPsuSOUR7ATZ3EpRwxx1xFl7LUbO3tYlu1wFLCBrCE%3d&risl=&pid=ImgRaw&r=0" />
	</div>

	<input type="radio" name="item2" value="3" />
	<div>
     <img src="https://th.bing.com/th/id/R.7383028831604862ec47fefee3e8f43f?rik=JvqjDCfPocchLg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fimages-of-nature-4.jpg&ehk=%2b1REJDS0cEPD0z2IP%2fddCyP9IgFz6xVpp8fyQr78SJ0%3d&risl=&pid=ImgRaw&r=0" />
	</div>

	<input type="radio" name="item2" value="4" />
	<div>
		<img src="https://th.bing.com/th/id/R.3d88a927f8529dcba03364b09d98adbe?rik=JYmQaMVSULpYQg&riu=http%3a%2f%2fthewowstyle.com%2fwp-content%2fuploads%2f2015%2f01%2fnature-images.jpg&ehk=BNPsuSOUR7ATZ3EpRwxx1xFl7LUbO3tYlu1wFLCBrCE%3d&risl=&pid=ImgRaw&r=0" />
	</div>
</div> 