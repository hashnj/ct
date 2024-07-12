import React, { useEffect, useState } from "react";
import ImageScroller from "../components/ImageScroller";
import { Nav } from "../components/Nav";
import { ProductCard } from "../components/ProductCard";
import { SideBar } from "../components/SideBar";
import { useRecoilValueLoadable } from "recoil";
import { products } from "../store/products";

const images = [
    'https://media.istockphoto.com/id/157283001/photo/golden-fields-of-wheat-panorama.jpg?s=1024x1024&w=is&k=20&c=yKDUUvnvEM1jsvm4_08t1jQg271HXqN3S7dUxcK81TQ=',
    'https://media.istockphoto.com/id/157283001/photo/golden-fields-of-wheat-panorama.jpg?s=1024x1024&w=is&k=20&c=yKDUUvnvEM1jsvm4_08t1jQg271HXqN3S7dUxcK81TQ=',
    'https://media.istockphoto.com/id/157283001/photo/golden-fields-of-wheat-panorama.jpg?s=1024x1024&w=is&k=20&c=yKDUUvnvEM1jsvm4_08t1jQg271HXqN3S7dUxcK81TQ=',
    'https://media.istockphoto.com/id/157283001/photo/golden-fields-of-wheat-panorama.jpg?s=1024x1024&w=is&k=20&c=yKDUUvnvEM1jsvm4_08t1jQg271HXqN3S7dUxcK81TQ=',
    // Add more image URLs as needed
];

export const Main = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [productData, setProductData] = useState([]);

    const data = useRecoilValueLoadable(products);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                if (data.state === 'hasValue') {
                    console.log(data.contents); // Log the fetched products data
                    setProductData(data.contents.data); // Update product data state
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
        <div className="flex overflow-scroll no-scrool justify-center items-center bg-backgrounds text-text w-screen">
            <Nav />
            <SideBar top='Dashboard' />
            <div className="w-full h-full overflow-scroll no-scrool">
                <div className="w-full -z-3 pt-20">
                    <ImageScroller images={images} />
                </div>
                <div className="grid bg-background ml-12 h-full grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {productData.map((product, index) => (
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
                    ))}
                </div>
            </div>
        </div>
    );
};
