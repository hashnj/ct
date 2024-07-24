import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { edit } from '../store/listing';
import { EditC, EditV } from '../store/edit';
import { FaArrowLeft } from 'react-icons/fa';

export const EditItem = () => {
    const [itemType, setItemType] = useState('product');
    const [item, setItem] = useState({
        category: '',
        parent: '',
        name: '',
        description: '',
        price: '',
        stock: '',
        image: '',
        isSubCategory: false
    });
    const [eitem, setEItem] = useRecoilState(EditV);
    const [itemC, setitemC] = useRecoilState(EditC);
    const [ed, setEd] = useRecoilState(edit);

    useEffect(() => {
        if (itemC.name) {
            setItemType('category');
            setItem({
                ...item,
                category: itemC.name || '',
                parent: itemC.parent || '',
                description: itemC.description || '',
                isSubCategory: itemC.isSubCategory || false
            });
        } else {
            setItemType('product');
            setItem({
                ...item,
                category: eitem.category || '',
                name: eitem.name || '',
                description: eitem.description || '',
                mrp:eitem.mrp||'', 
                sell_price: eitem.price || '',
                stock: eitem.stock || '',
                image: eitem.image || '',
            });
        }
    }, [itemC, eitem]);

    const handleItemTypeChange = (e) => {
        setItemType(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setItem((prevItem) => ({ ...prevItem, [name]: inputValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (itemType === 'product') {
            console.log('Product edited: ', { ...item, ...eitem });
            try{
            const req=await fetch("http://localhost:3000/products/",{
                method:'put',
            headers:{
                'Content-type':'application/json',
                'authorization':localStorage.getItem('token')
            },
            body:JSON.stringify({item})
        })
        const data=await req.json();
        console.log(data);
    }
    catch(e){
        console.log(e);
    }
    } else {
            console.log('Category edited: ', { ...item, ...itemC });
            try{
            const req= await fetch('http://localhost:3000/categories',{
                method:'put',
                headers:{
                    'Content-type':'application/json',
                    'authorization':localStorage.getItem('token')
                },
                body:JSON.stringify({item,itemC})
            })
            const data=await req.json();
            console.log(data);}
            catch(e){
                console.log(e);
            }
        }
    };

    return (
        <div className='bg-backgrounds min-h-screen w-screen h-full flex text-text justify-center items-center'>
            <form className="max-w-md mx-auto bg-background rounded-lg p-4" onSubmit={handleSubmit}>
                <div className='mb-5 -ml-1 flex '>
                    <div onClick={() => {
                                    setItemType('product');
                                    setitemC({
                                        name:"",
                                        description:"",
                                        isSubCategory:false,
                                        parent:''
                                        })
                                        setEItem({
                                            category: '',
                                            name: '',
                                            description: '',
                                            mrp:'',
                                            price: '',
                                            stock: '',
                                            image: '',
                                        })
                                        setEd(false)
                                    }} 
                                    className='border-text/10 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-backgrounds/50 p-1 px-2 rounded-md text-lg font-semibold'
                    >
                        <FaArrowLeft/>
                    </div>
                </div>
                <h2 className="text-xl font-bold mb-4">Edit {itemType === 'product' ? 'Product' : 'Category'}</h2>
                <div className="mb-4">
                    <label className="mr-4">Select Item Type:</label>
                    <select value={itemType} onChange={handleItemTypeChange} className="border-text/5 bg-backgrounds/50 rounded">
                        <option value="product">Product</option>
                        <option value="category">Category</option>
                    </select>
                </div>
                {itemType === 'product' && (
                    <>
                        <label htmlFor="category">Category:</label>
                        <input
                            className="w-full p-2 mb-2 bg-backgrounds/50 border-text/5 rounded"
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={item.category}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="name">Product Name:</label>
                        <input
                            className="w-full p-2 mb-2 bg-backgrounds/50 border-text/5 rounded"
                            type="text"
                            name="name"
                            placeholder="Product Name"
                            value={item.name}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="description">Description:</label>
                        <textarea
                            className="w-full p-2 mb-2 bg-backgrounds/50 border-text/5 rounded"
                            name="description"
                            placeholder="Description"
                            value={item.description}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="price">MRP:</label>
                        <input
                            className="w-full p-2 mb-2 bg-backgrounds/50 border-text/5 rounded"
                            type="number"
                            name="mrp" 
                            step="0.01"
                            placeholder="MRP"
                            value={item.mpr}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="price">Price:</label>
                        <input
                            className="w-full p-2 mb-2 bg-backgrounds/50 border-text/5 rounded"
                            type="number"
                            name="price"
                            step="0.01"
                            placeholder="Price"
                            value={item.price}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="stock">Stock Available:</label>
                        <input
                            className="w-full p-2 mb-2 bg-backgrounds/50 border-text/5 rounded"
                            type="number"
                            name="stock"
                            placeholder="Stock Available"
                            value={item.stock}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="image">Image Link:</label>
                        <input
                            className="w-full p-2 mb-2 bg-backgrounds/50 border-text/5 rounded"
                            type="text"
                            name="image"
                            placeholder="Image Link"
                            value={item.image}
                            onChange={handleChange}
                            required
                        />
                    </>
                )}
                {itemType === 'category' && (
                    <>
                        <label htmlFor="category">Category Name:</label>
                        <input
                            className="w-full p-2 mb-2 bg-backgrounds/50 border-text/5 rounded"
                            type="text"
                            name="category"
                            placeholder="Category Name"
                            value={item.category}
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="description">Description:</label>
                        <textarea
                            className="w-full p-2 mb-2 bg-backgrounds/50 border-text/5 rounded"
                            name="description"
                            placeholder="Description"
                            value={item.description}
                            onChange={handleChange}
                            required
                        />
                        {item.isSubCategory && (
                            <>
                                <label htmlFor="parent">Parent Category:</label>
                                <input
                                    className="w-full p-2 mb-2 bg-backgrounds/50 border-text/5 rounded"
                                    type="text"
                                    name="parent"
                                    placeholder="Parent Category Name"
                                    value={item.parent}
                                    onChange={handleChange}
                                />
                            </>
                        )}
                        <div className="mb-4 ml-1">
                            <label className="inline-flex items-center">
                                <input
                                    type="checkbox"
                                    name="isSubCategory"
                                    checked={item.isSubCategory}
                                    onChange={handleChange}
                                    className="text-primary"
                                />
                                <span className="ml-2">Is Sub-Category</span>
                            </label>
                        </div>
                    </>
                )}
                <button className="w-full p-2 bg-primary rounded-lg" type="submit">
                    Edit {itemType === 'product' ? 'Product' : 'Category'}
                </button>
            </form>
        </div>
    );
};

export default EditItem;
