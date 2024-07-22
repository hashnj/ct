import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { addC } from '../store/listing';
import { FaArrowLeft } from 'react-icons/fa';

const AddCategory = () => {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        parent:'',
        isSubCategory: false
    });
    const [ac,setAddC]=useRecoilState(addC)
    // const [subCategory, setSubCategory] = useState({
    //     name: '',
    //     description: '',
    //     isSubCategory: false
    // });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setCategory((prevCategory) => ({ ...prevCategory, [name]: inputValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log('Category submitted: ', category);
        const send=await fetch('http://localhost:3000/categories',{
            method:'post',
            headers:{
                'Content-type':'application/json',
                'authorization':localStorage.getItem('token')
            },
            body:JSON.stringify({category})
        })
        const data=await send.json();
        console.log(data);
        if(data){
            setCategory({
                name: '',
                description: '',
            });
            setAddC(false)
            location.reload();
        }
    };


    return (
    <div className='bg-backgrounds min-h-screen w-screen h-full flex text-text justify-center items-center'>
        <form className="max-w-md mx-auto bg-background rounded-lg p-4" onSubmit={handleSubmit}>
            <div className=' mb-5 -ml-1 flex '>
                <div onClick={()=>{setAddC(false)}} className='border-text/10 border hover:bg-primary/70 active:bg-primary hover:text-background cursor-pointer bg-backgrounds/50 p-1 px-2 rounded-md text-lg font-semibold'>
                    <FaArrowLeft/>
                </div>
            </div>
            <h2 className="text-xl font-bold mb-4">Add New Category</h2>
            <input
                className="w-full p-2 bg-backgrounds/50  mb-2 border-text/5 rounded"
                type="text"
                name="name"
                placeholder="Category Name"
                value={category.name}
                onChange={handleChange}
                required
            />
            <textarea
                className="w-full p-2 mb-2 bg-backgrounds/50  border-text/5 rounded"
                name="description"
                placeholder="Description"
                value={category.description}
                onChange={handleChange}
                required
            />
            {
                category.isSubCategory?(
                <>
                <label htmlFor="category">Parent Category:</label>
                <input
                    className="w-full p-2 mb-2 bg-backgrounds/50 border-none rounded"
                    type="text"
                    name="parent" 
                    value={category.parent}
                    placeholder="Parent Category Name"
                    onChange={handleChange}
                /></>):''
            }
            <div className="mb-4">
                <label className="inline-flex  items-center">
                    <input
                        type="checkbox"
                        name="isSubCategory"
                        checked={category.isSubCategory}
                        onChange={handleChange}
                        className="form-checkbox"
                    />
                    <span className="ml-2">Is Sub-Category</span>
                </label>
            </div>
            <button className="w-full p-2 bg-primary font-semibold rounded" type="submit">
                Add Category
            </button>
        </form>
    </div>
    );
};

export default AddCategory;
