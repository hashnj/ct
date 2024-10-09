import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil"
import { products } from "../store/products"
import { useEffect, useState } from "react";
import { Edit } from "../assets/Svg";
import { edit } from "../store/listing";
import { EditV } from "../store/edit";
import { authCheck } from "../store/auth";
import { sideBar } from "../store/dash";

export const PnL=()=>{
    const data =useRecoilValueLoadable(products);
    const info=useRecoilValueLoadable(authCheck);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [productData, setProductData] = useState([]);
    const [productDat, setProductDat] = useState([]);
    const [ed,setEd]=useRecoilState(edit);
    const [edt,setEdt]=useRecoilState(EditV);
    const active = useRecoilValue(sideBar);
    
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

    useEffect(() => {
        console.log(info);
        const filterProducts = () => {
            if (info.state === 'hasValue') {
                const userInfo = info.contents.role;
                console.log(userInfo)
                if (userInfo == 'Admin') {
                    setProductDat(productData);
                } else if (userInfo == 'Vendor' ) {
                    setProductDat(productData.filter(d => d.vendor_id?.business_name == info.contents.info.vendor.business_name));
                }
                console.log(productDat);
            } else if (info.state === 'hasError') {
                setError('Error loading user info');
            }
        };

        filterProducts();
    }, [info, productData]);


    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen">Error: {error}</div>;
    }



    return(
        <>
        
        <div className="text-xl text-text font-semibold">
                <div className="mt-5">
                    <div className={`w-full ${active?'text-xs md:text-lg lg:text-xl':'text-sm md:text-base lg:text-xl'}`}>
                        
                        {/* <div className="border-b flex justify-around  p-1">
                            <div className="w-full pl-3 ">S.no.</div>
                            <div className="w-full ">Product</div>
                            <div className="w-full ">Vendor</div>
                            <div className="w-full pr-1 ">Category</div>
                            <div className="w-full ">Sub-Cat.</div>
                            <div className="w-full pr-1 ">description</div>
                            <div className="w-full ">Stock</div>
                            <div className="w-full ">Price($)</div>
                            <div className="w-full">Image</div>
                            <div className="">Edit</div>
                            
                        </div> */}
                        {productDat.map((d,i)=>
                        <div key={i} className="flex hover:border-text/60 transition-all  my-2 py-1 border text-wrap border-text/20 rounded-lg items-center w-full">
                            <div className=" w-full text-center">{i+1}.</div>
                            <div className="w-full  pl-2">{d.name}</div>
                            <div className="w-full  pl-2">{d.vendor_id?.business_name || "Corecart"}</div>
                            <div className="w-full  pl-2">{d.category_id.name}</div>
                            <div className="w-full  pl-2">{d.category_id.name}</div>
                            <div className="w-full text-wrap pl-2">{d.description} </div> 
                            <div className="w-full  text-center p-2">
                                    <div>
                                        Stock:
                                    </div>
                                    <div>
                                        {d.stock}
                                    </div>
                                 </div> 
                            <div className="w-full  text-center p-2">
                            <div>
                                        MRP:
                                    </div>
                                    <div>
                                        ${d.mrp}
                                    </div></div>
                            <div className="w-full  text-center p-2">
                            <div>
                                        Price:
                                    </div>
                                    <div>
                                        ${d.price}
                                    </div></div>
                            <div className="w-full p-2 justify-center items-center">
                                <div className="">{<a target="_blank" href={d.images}><img className="size-12 md:size-14 mx-auto " src={d.images} alt={d.name}/></a>}
                                </div>
                                </div>
                                {console.log(d)}
                                

                            <div className="w-full   "><div className="bg-primary cursor-pointer rounded-md min size-6 m-auto" onClick={()=>{
                                setEdt(
                                    (prev)=>({...prev,category:d.category_id.name,name:d.name,description:d.description,price:d.price,stock:d.stock,image:d.images})
                                )
                                setEd(true);
                            }}>
                                <Edit/>
                                </div>
                            </div>
                            </div>
                        )}
                    </div>
                </div>
                </div>
            
        </>
    )
} 