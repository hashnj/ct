import { useEffect } from "react";
import { Nav } from "../components/Nav";
import { SideBar } from "../components/SideBar";
import { useRecoilValue, useRecoilValueLoadable } from "recoil";
import { detailsSelector } from "../store/detailsAtom"; 
import { themeState } from "../store/atoms";
import { sideBar } from "../store/dash";

export const Dashboard = () => {
    const detailsLoadable = useRecoilValueLoadable(detailsSelector);
    const theme = useRecoilValue(themeState);
    const active = useRecoilValue(sideBar);

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

    return (
        <div className="flex justify-center items-center bg-backgrounds text-text w-full min-h-screen h-full">
            <Nav />
            <SideBar top='Dashboard' />
            <div className={`${active?'md:ml-56 ':''} transition-all duration-300 w-full h-full pt-20 pb-4 pr-6 pl-16 grid grid-cols-2 lg:grid-cols-3 gap-2`}>
                <div className="bg-background/50 shadow-[0_0_4px]  shadow-text/50 rounded-lg p-2">
                    <div className="text-xl flex flex-col h-full w-full font-bold text-text/70">
                        Total Orders:
                        <div className="flex justify-center items-center h-full text-5xl text-primary/80">
                            {data.orders.length || 0}
                        </div>
                    </div>
                </div>
                <div className="bg-background/50 rounded-lg  shadow-[0_0_4px] shadow-text/50 p-2">
                    <div className="text-xl flex flex-col h-full w-full font-bold text-text/70">
                        Admins:
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
                <div className="bg-background/50 rounded-lg row-span-2 col-span-2 md:col-span-1 h-[480px] overflow-scroll no-scrool  p-2 shadow-[0_0_4px] shadow-text/50">
                    <div className="text-xl flex flex-col w-full font-bold text-text/70">
                         Total Users:
                        <div className="text-5xl py-2  text-primary/80">
                            {data.users.length || 0}
                        </div>
                        Users & their Roles:
                        <div className="overflow-scroll no-scrool mt-5 ">
                        
                        
                            {data.users ? data.users.map((user,key) => <div className="flex justify-between" key={key}><div>{user.userName}</div> <div>{user.role}</div></div> ):''}
                        
                        </div>
                    </div>
                </div>
                <div className="bg-background/50 rounded-lg col-span-2 p-2 shadow-[0_0_4px] shadow-text/50">
                    <div className="text-xl flex flex-col h-full w-full font-bold text-text/70">
                        Reviews:
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
                <div className="bg-background/50 rounded-lg col-span-2 md:col-span-3 p-2 shadow-[0_0_4px] shadow-text/50">
                    <div className="text-sm sm:text-xl flex flex-col h-full w-full font-bold text-text/70">
                        Products Details:
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
    );
};
