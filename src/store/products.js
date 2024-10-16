import { selector } from "recoil";
import { B_Url } from "../config";

export const products=selector({
    key:'products',
    get:async ({get})=>{
        const res = await fetch(`${B_Url}/products/`,{
            headers:{
                'authorization':localStorage.getItem('token')
            }
        });
        const data = await res.json();
        return data;  
    }
})

export const categories=selector({
    key:'category',
    get:async ({get})=>{
        const res = await fetch(`${B_Url}/categories/`,{
            headers:{
                'authorization':localStorage.getItem('token')
            }
        });
        const data = await res.json();
        // console.log(data);
        return data;
    }
})