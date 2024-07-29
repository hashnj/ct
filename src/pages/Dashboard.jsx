import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { SideBar } from "../components/SideBar";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { detailsSelector } from "../store/detailsAtom"; 
import { themeState } from "../store/atoms";
import { sideBar } from "../store/dash";
import { AiFillDelete } from "react-icons/ai";
import { ImCross } from "react-icons/im";

export const Dashboard = () => {
    const detailsLoadable = useRecoilValueLoadable(detailsSelector);
    const theme = useRecoilValue(themeState);
    const active = useRecoilValue(sideBar);
    const [del,setDel] = useState(false);

    useEffect(()=>{
        document.body.classList=theme;
    },[theme])

    useEffect(() => {
        if (detailsLoadable.state === 'hasValue') {
            console.log(detailsLoadable);
            console.log(detailsLoadable.contents);
        }
    }, [detailsLoadable]);

    if (detailsLoadable.state === 'loading') {
        return <div>Loading...</div>;
    }

    if (detailsLoadable.state === 'hasError') {
        return <div>Error loading data.</div>;
    }

    const data = detailsLoadable.contents || {};
    console.log(data);

    const handelDelete=async ()=>{
        const req=await fetch('http://localhost:3000/user/del',{
            headers:{
                'authorization':localStorage.getItem('token')
            },
            body:{}
        })
    }

    return (
        <div className="flex flex-col justify-center relative items-center bg-backgrounds  text-text w-full min-h-screen h-full">
            <Nav />
            <SideBar top='Dashboard' />
            <div className={`${active?'md:pl-72 ':''} transition-all  duration-300 w-full h-full pt-20  ${active?'mr-6':'px-5 sm:px-10 lg:mx-10 md:pl-24 md:pr-16'}  `}>
                {del && <div onClick={()=>setDel(false)} className="fixed z-20 w-full h-full flex justify-center items-center">
                    <div className="w-[400px] z-30 bg-backgrounds relative h-72 md:mr-20 mb-10 rounded-xl">
                        <div className="absolute right-3 rounded-md text-3xl text-text/70 p-2 bg-background/50 hover:bg-background/70 hover:text-text hover:scale-95 top-2"><ImCross/></div>
                        <div className="w-full h-full flex justify-center items-center flex-col text-text/70 font-bold text-3xl">
                        <div>Are You Sure ????</div>
                        <div className="font-semibold text-text text-lg mt-4">
                            <button className="p-2 px-3 bg-red-600/90 m-2 rounded-md hover:bg-red-600 hover:scale-95" onClick={handelDelete()}>Yes, Delete</button>
                            <button className="p-2 px-3 bg-green-600/90 m-2 rounded-md hover:bg-green-600 hover:scale-95" onClick={()=>{

                                setDel(false)}}>No, Cancel</button>
                        </div>
                        </div>
                    </div>
                </div>}
            <div className="text-2xl font-bold font-serif pt-2 pb-4 pl-2">Admin DashBoard</div>
            <div className={`transition-all duration-300 w-full h-full  grid grid-cols-2 lg:frid-cols-3 xl:grid-cols-4 gap-6`}>
                
                <div className="bg-background shadow-[0_0_4px]  shadow-text/5 rounded-lg min-w-[200px] p-2 pt-4 pl-4">
                    <div className="text-xl flex flex-col h-full min-h-[205px] md:min-h-[210px] w-full relative font-bold text-text/70">
                        <div className="h-2/3 ">
                        <div className="text-text">
                        Products :
                        </div>
                        <div className="md:my-4 mt-4 font-normal text-lg text-text/50">
                        Products available - <span className="text-primary">{data.products.length || 0}</span>
                        </div> 
                        </div>
                        <div className="flex absolute bottom-1 ">
                            <button className="md:px-4 p-3 font-thin text-text text-sm md:text-base float-end hover:text-text transition-all duration-300 rounded-md m-1 bg-text/10 hover:bg-primary">View Products</button>
                            <button className="md:px-4 p-3 font-thin text-text text-sm md:text-base hover:text-primary transition-all duration-300 rounded-md m-1 bg-text/10 hover:bg-primary/10">Add Products</button>
                        </div>
                    </div>
                </div>
                <div className="bg-background shadow-[0_0_4px]  shadow-text/5 rounded-lg min-w-[200px]  p-2 pt-4 pl-4">
                    <div className="text-xl flex flex-col min-h-[205px] md:min-h-[210px] h-full w-full relative font-bold text-text/70">
                        <div className="h-2/3">
                        <div className="text-text">
                            Categories :
                            </div>
                            <div className="mt-4 md:my-4 font-normal text-text/50 text-lg">
                                <div className="my-1">Categories - <span className="font-normal text-primary my-1">{data.categories.length || 0}</span></div> <div className=""> subCategories - <span className="text-primary">{data.subCategories.length || 0}</span></div> 
                            </div> 
                        </div>
                        <div className="flex absolute bottom-1 ">
                            <button className="md:px-4 p-3 text-text font-thin text-sm md:text-base float-end hover:text-text transition-all duration-300 rounded-md m-1 bg-text/10 hover:bg-primary">
                            View Categories
                            </button>
                            <button className="md:px-4 p-3 font-thin text-text text-sm md:text-base hover:text-primary transition-all duration-300 rounded-md m-1 bg-text/10 hover:bg-primary/10">
                            Add Categories
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-background rounded-lg row-span-2 sm:row-span-3 sm:col-span-2 md:col-span-2 h-[490px] overflow-scroll no-scrool  p-2 pt-4 pl-4 shadow-[0_0_4px] shadow-text/5">
                    <div className="text-xl flex flex-col w-full  font-bold text-text">
                         Total Users:
                        <div className="text-5xl py-4 justify-center flex  text-primary/80">
                            {data.users.length || 0}
                        </div>
                        <div className="pl-2">
                        Users & their Roles :-
                        </div>
                        <div className="overflow-scroll  no-scrool mt-5 md:px-4 ">
                        <div className=" flex justify-around font-serif underline-offset-4 text-text pb-4 underline"><span>User Name</span> <span>Role</span> <span>Actions</span></div>
                        
                            {data.users ? data.users.map((user,key) => <div className="flex justify-between text-text/40 text-base" key={key}><div className="w-1/3 md:flex justify-center">{user.userName}</div> <div className='w-1/3 md:flex justify-center pl-8'>{user.role}</div><div className="flex justify-center w-1/3 text-red-600 cursor-pointer" onClick={()=>setDel(true)}><AiFillDelete/></div></div> ):''}
                        
                        </div>
                    </div>
                </div>
                <div className="bg-background shadow-[0_0_4px]  shadow-text/5 rounded-lg min-w-[200px] p-4">
                    <div className="text-xl flex flex-col min-h-[205px] md:min-h-[210px] h-full w-full font-bold text-text/70">
                    <div className="text-text">
                        Total Orders:
                        </div>
                        <div className="flex justify-center items-center h-full text-5xl text-primary/80">
                            {data.orders.length || 0}
                        </div>
                    </div>
                </div>
                <div className="bg-background rounded-lg  shadow-[0_0_4px] shadow-text/5 pt-4 pl-4 p-2">
                    <div className="text-xl flex flex-col min-h-[205px] md:min-h-[210px] h-full w-full font-bold text-text/70">
                    <div className="text-text">
                        Admins:
                        </div>
                        <div className="max-h-full">
                            <div className='text-5xl w-full py-5 flex items-center justify-center text-primary/80'>
                            
                                {data.users ? data.users.filter(user => user.role === 'Admin').length : 0}
                            </div>
                            <div className="h-full">
                                {data.users ? data.users.filter(user => user.role === 'Admin').map((admin, index) => (
                                    <div key={index} className='my-2 text-xl'>* {admin.userName}</div>
                                )) : null}
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="bg-background rounded-lg col-span-2 lg:col-span-3 xl:col-span-4 p-2 pt-4 pl-4 shadow-[0_0_4px] shadow-text/5">
                    <div className="text-xl flex flex-col h-full w-full font-bold text-text/70">
                    <div className="text-text">
                        Reviews:
                        </div>
                        <div className="flex">
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-5xl py-10 text-primary/80">{data.reviews.length || 0}</div>
                                <div>Good</div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-5xl py-10 text-primary/80">{data.reviews.length || 0}</div>
                                <div>Bad</div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-5xl py-10 text-primary/80">{data.reviews.length || 0}</div>
                                <div>All</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-background rounded-lg col-span-2 lg:col-span-4  p-2 pt-4 pl-4 shadow-[0_0_4px] shadow-text/5">
                    <div className="text-sm sm:text-xl flex flex-col h-full w-full font-bold text-text/70">
                    <div className="text-text">
                        Products Details:
                        </div>
                        <div className="flex">
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-3xl sm:text-5xl py-10 text-primary/90">{data.products.length || 0}</div>
                                <div>Total Products</div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-3xl sm:text-5xl py-10 text-primary/90">{data.products.reduce((total,product)=>total+parseInt(product.stock),0) || 0}</div>
                                <div>Inventory</div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-3xl sm:text-5xl py-10 text-primary/90">{data.categories.length || 0}</div>
                                <div>Categories</div>
                            </div>
                            <div className="w-full flex flex-col justify-center items-center h-full">
                                <div className="text-3xl sm:text-5xl py-10 text-primary/90">{data.subCategories.length || 0}</div>
                                <div>Sub-Categories</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    );
};
