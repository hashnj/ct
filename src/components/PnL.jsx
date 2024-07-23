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
                    setProductDat(productData.filter(d => d.vendor_id.business_name == info.contents.info.vendor.business_name));
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
                    <table className={`w-full ${active?'text-xs md:text-lg lg:text-xl':'text-sm md:text-base lg:text-xl'}`}>
                        <thead>
                        <tr className="border-b border-text/10 p-1">
                            <th className="border-r border-text/10">S.no.</th>
                            <th className="border-r border-text/10">Product Name</th>
                            <th className="border-r border-text/10">Vendor</th>
                            <th className="border-r border-text/10">Category</th>
                            <th className="border-r border-text/10">Sub-Cat.</th>
                            <th className="border-r border-text/10">description</th>
                            <th className="border-r border-text/10">Stock</th>
                            <th className="border-r border-text/10">Price($)</th>
                            <th className="">Image</th>
                            <th className="border-l border-text/10">Edit</th>
                            
                        </tr>
                        </thead>
                        <tbody className="border-b border-text/10">
                        {productDat.map((d,i)=>
                        <tr key={i}>
                        {console.log(d)}
                            <td className="border-r border-text/10 text-center">{i+1}.</td>
                            <td className="border-r border-text/10 pl-2">{d.name}</td>
                            <td className="border-r border-text/10 pl-2">{d.vendor_id?.business_name || "Admin"}</td>
                            <td className="border-r border-text/10 pl-2">{d.category_id.name}</td>
                            <td className="border-r border-text/10 pl-2">{d.category_id.name}</td>
                            <td className="border-r border-text/10 pl-2">{d.description} </td> 
                            <td className="border-r border-text/10 text-center p-2">{d.stock} </td> 
                            <td className="border-r border-text/10 text-center p-2">{d.price}</td>
                            <td className="p-2 justify-center items-center">
                                <div>{<a target="_blank" href={d.images}><img className="size-12 md:size-14 mx-auto " src={d.images} alt={d.name}/></a>}
                                </div>
                                </td>

                            <td className="border-l  border-text/10  "><div className="bg-primary cursor-pointer rounded-md min size-6 m-auto" onClick={()=>{
                                setEdt(
                                    (prev)=>({...prev,category:d.category_id.name,name:d.name,description:d.description,price:d.price,stock:d.stock,image:d.images})
                                )
                                setEd(true);
                            }}>
                                <Edit/>
                                </div>
                            </td>
                        </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                </div>
            
        </>
    )
} 