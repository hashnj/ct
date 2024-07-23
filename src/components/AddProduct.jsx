import React, { useState } from 'react';
import { addP } from '../store/listing';
import { useRecoilState } from 'recoil';
import { FaArrowLeft } from 'react-icons/fa';

const AddProduct = () => {
    const [product, setProduct] = useState({
        category: '',
        name: '',
        description: '',
        mrp:'',
        price: '',
        stock: '',
        image: ''
    });

    const [ap,setAddP]=useRecoilState(addP)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Product submitted: ', product);
        const send=await fetch('http://localhost:3000/products/add',{
            method:'post',
            headers:{
                'Content-type':'application/json',
                'authorization':localStorage.getItem('token')
            },
            body:JSON.stringify({product})
        })
        const data=await send.json();
        console.log(data);
        if(data){
            setProduct({
                category: '',
                name: '',
                description: '',
                mrp: '',
                sell_price:'',
                stock: '',
                image: ''
            });
            setAddP(false)
            location.reload();
        }
    };
    
    return (
    <div className='bg-backgrounds min-h-screen w-screen h-full overflow-scrool no-scroll flex text-text justify-center items-center'>
        <form className="max-w-md bg-background rounded-lg mx-auto p-4" onSubmit={handleSubmit}>
        <div className=' mb-5 -ml-1 flex '>
            <div onClick={()=>{setAddP(false)}} className='border-text/10 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-backgrounds/50 p-1 px-2 rounded-md text-lg font-semibold'>
                <FaArrowLeft/></div>
        </div>
            
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <input
                className="w-full bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
                type="text"
                name="category"
                placeholder="Category"
                value={product.category}
                onChange={handleChange}
                required
            />
            <input
                className="w-full bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                required
            />
            <textarea
                className="w-full bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
                required
            />
            <input
                className="w-full bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
                type="number"
                name="mrp"
                placeholder="MRP"
                value={product.mrp}
                onChange={handleChange}
                required
            />
            <input
                className="w-full bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
                type="number"
                name="price"
                placeholder="Your Price"
                value={product.price}
                onChange={handleChange}
                required
            />
            <input
                className="w-full bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
                type="number"
                name="stock"
                placeholder="Stock Available"
                value={product.stock}
                onChange={handleChange}
                required
            />
            <input
                className="w-full bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
                type="text"
                name="image"
                placeholder="Image Link"
                value={product.image}
                onChange={handleChange}
                required
            />
            <button className="w-full p-2 bg-primary  text-text rounded" type="submit">
                Add Product
            </button>
        </form>
        </div>
    );
};

export default AddProduct;
