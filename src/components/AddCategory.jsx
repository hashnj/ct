import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { addC } from '../store/listing';
import { ImCross } from 'react-icons/im';
import { FaPlus } from 'react-icons/fa';

const AddCategory = () => {
    const [category, setCategory] = useState({
        name: '',
        description: '',
        cat_img:'',
        parent:'',
        isSubCategory: false
    });
    const [ac,setAddC]=useRecoilState(addC)
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
                cat_img:''
            });
            setAddC(false)
            location.reload();
        }
    };


    return (
    <div className='backdrop-blur-sm absolute z-10  min-h-screen w-screen h-full flex text-text justify-center items-center'>
        <form className="max-w-md mx-auto bg-background border-2 border-text/10 rounded-lg" onSubmit={handleSubmit}>
            <div className='flex p-4 items-center flex-row-reverse justify-between border-b-2 border-text/10'>
            <div className='flex '>
                <div onClick={()=>{setAddC(false)}} className='hover:bg-text/10 hover:text-text cursor-pointer p-2 rounded-md text-xl '>
                    <ImCross/>
                </div>
            </div>
            <h2 className="text-2xl text-text font-bold ">Add New Category</h2>
            </div>
            <div className='p-4'>
            <input
                className="w-full p-2 bg-backgrounds/50  mb-2 border-text/5 rounded"
                type="text"
                name="name"
                placeholder="Category Name"
                value={category.name}
                onChange={handleChange}
                required
            />
            <input
                className="w-full p-2 bg-backgrounds/50  mb-2 border-text/5 rounded"
                type="text"
                name="cat_img"
                placeholder="Category Image"
                value={category.cat_img}
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
                />
                </>
                ):null
            }
            <div className="mb-4 ml-1">
                <label className="inline-flex  items-center">
                    <input
                        type="checkbox"
                        name="isSubCategory"
                        checked={category.isSubCategory}
                        onChange={handleChange}
                        className="bg-backgrounds/20 focus:ring-primary focus:accent-primary focus:bg-primary border-text/10 rounded"
                    />
                    <span className="ml-2 font-thin text-text">Is Sub-Category</span>
                </label>
            </div>
            <button className="px-4 p-2 bg-primary font-semibold group flex text-text group justify-center items-center rounded" type="submit">
            <FaPlus className='size-5 pr-1 group-hover:animate-pulse'/><div className='group-hover:underline'>Add Category</div>
            </button>
            </div>
        </form>
    </div>
    );
};

export default AddCategory;
