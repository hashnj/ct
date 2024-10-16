import React, { useState } from 'react';
import { addP } from '../store/listing';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { FaArrowLeft, FaPlus } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import { categories } from '../store/products';
import { B_Url } from '../config';

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
        // console.log('Product submitted: ', product);
        const send=await fetch(`${B_Url}/products/add`,{
            method:'post',
            headers:{
                'Content-type':'application/json',
                'authorization':localStorage.getItem('token')
            },
            body:JSON.stringify({product})
        })
        const data=await send.json();
        // console.log(data);
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
    <div className='absolute z-10 backdrop-blur-sm min-h-screen w-screen h-full overflow-hidden no-scrool flex text-text justify-center items-center'>
        <form className="max-w-md border-2 border-text/10 bg-background rounded-lg mx-auto " onSubmit={handleSubmit}>
        <div className=' p-4 border-b-2 flex justify-between flex-row-reverse items-center border-text/10'>
        <div className='flex float-right '>
            <div onClick={()=>{setAddP(false)}} className='hover:bg-text/20 active:ring-2 ring-primary hover:text-text cursor-pointer p-2 rounded-md text-lg '>
                <ImCross/></div>
        </div>
            
            <h2 className="text-2xl font-bold text-text">Add New Product</h2>
            </div>
            <div className='p-4 '>
            <input
                className="w-full focus:ring-primary focus:border-none active:ring-primary focus:ring-2 bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
                type="text"
                name="name"
                placeholder="Product Name"
                value={product.name}
                onChange={handleChange}
                required
            />
            <textarea
                className="w-full bg-backgrounds/50 focus:ring-primary focus:border-none focus:ring-2 active:ring-primary p-2 mb-2 border-text/5 rounded"
                name="description"
                placeholder="Description"
                value={product.description}
                onChange={handleChange}
                required
            />
            <div className='w-full flex justify-between items-center '>
            <input
                className="w-[49%] focus:ring-primary focus:border-none focus:ring-2 active:ring-primary  bg-backgrounds/50 p-2 mb-2  border-text/5 rounded"
                type="number"
                name="mrp"
                placeholder="MRP"
                value={product.mrp}
                onChange={handleChange}
                required
            />
            <select
            className="w-[49%] focus:ring-primary focus:border-none focus:ring-2 active:ring-primary bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
            type="text"
            name="category"
            placeholder="Select Category"
            value={product.category}
            onChange={handleChange}
            required
        >
            <option className="text-text/30" value="select">Select Category</option>
    {
        category.contents.categories.map((categoryItem) => (
            <option key={categoryItem.id} value={categoryItem.name}>
                {categoryItem.name}
            </option>
        ))
    }
    {
        category.contents.subCategories.map((subCategoryItem) => (
            <option key={subCategoryItem.id} value={subCategoryItem.name}>
                {subCategoryItem.name}
            </option>
        ))
    }
</select>

            </div>
            <input
                className="w-full bg-backgrounds/50 focus:ring-primary focus:border-none focus:ring-2 active:ring-primary p-2 mb-2 border-text/5 rounded"
                type="number"
                name="price"
                placeholder="Your Price"
                value={product.price}
                onChange={handleChange}
                required
            />
            <input
                className="w-full bg-backgrounds/50 p-2 mb-2 focus:ring-primary focus:ring-2 focus:border-none active:ring-primary border-text/5 rounded"
                type="number"
                name="stock"
                placeholder="Stock Available"
                value={product.stock}
                onChange={handleChange}
                required
            />
            <input
                className="w-full bg-backgrounds/50 focus:ring-primary focus:ring-2 focus:border-none active:ring-primary p-2 mb-2 border-text/5 rounded"
                type="text"
                name="image"
                placeholder="Image Link"
                value={product.image}
                onChange={handleChange}
                required
            />
            <button className="px-4 group p-2 hover:bg-primary focus:ring-2 active:ring-4 active:ring-primary bg-primary flex justify-center items-center mt-2 text-text rounded" type="submit">
                <FaPlus className='size-5 pr-1 group-hover:animate-pulse transition-all '/> <div className='group-hover:underline font-semibold'>Add Product</div>
            </button>
            </div>
        </form>
        </div>
    );
}
};

export default AddProduct;
