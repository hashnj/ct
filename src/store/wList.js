import { atom, selector } from "recoil";

export const wList = selector({
    key:'active',
    get:async ({get})=>{
        const list=get(wishListState);
        console.log(list);
        const req = await fetch('http://localhost:3000/products/wish',{
            method:'post',
            headers:{
                'Content-type':'application/json',
                'authorization':localStorage.getItem('token')
            },
            body:JSON.stringify({list})
        })
        const dta = await req.json();
        console.log(dta);
        return dta;
    }
})
export const getWList=selector({
    key:'getList',
    get:async ({get})=>{
        const req=await fetch('http://localhost:3000/products/wish',{
            headers:{
                'authorization':localStorage.getItem('token')
            }
        });
        const data=await req.json();
        return data;
    }
})
 
export const wishListState = atom({
    key:'wishList',
    default:[]
})