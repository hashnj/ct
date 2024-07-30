import React, { useState } from 'react';
import { addP } from '../store/listing';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { categories } from '../store/products';

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
    const category = useRecoilValueLoadable(categories);

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


    if (category.state === 'loading') {
        return <div>Loading...</div>;
    }

    if (category.state === 'hasError') {
        return <div>Error loading data.</div>;
    }

    if (category.state === 'hasValue') {

    return (
    <div className='absolute z-10 bg-backgrounds/10 min-h-screen w-screen h-full overflow-scrool no-scroll flex text-text justify-center items-center'>
        <form className="max-w-md border-2 border-text/10 bg-background rounded-lg mx-auto p-6" onSubmit={handleSubmit}>
        <div className=' mb-5 mr-1 flex float-right '>
            <div onClick={()=>{setAddP(false)}} className='border-text/10 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-backgrounds/50 p-1 px-2 rounded-md text-lg font-semibold'>
                <ImCross/></div>
        </div>
            
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
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
            <div className='w-full flex justify-between items-center '>
            <input
                className="w-[49%]  bg-backgrounds/50 p-2 mb-2  border-text/5 rounded"
                type="number"
                name="mrp"
                placeholder="MRP"
                value={product.mrp}
                onChange={handleChange}
                required
            />
            <select
                className="w-[49%]  bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
                type="text"
                name="category"
                placeholder="Select Category"
                value={product.category}
                onChange={handleChange}
                required
            >
                <option className='text-text/30 ' disabled selected value="">Select Category</option>
            </select>
            </div>
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
            <button className="w-full p-2 bg-primary flex justify-center items-center text-text rounded" type="submit">
                <FaPlus className='size-5 pr-1'/> Add Product
            </button>
        </form>
        </div>
    );
}
};

export default AddProduct;
