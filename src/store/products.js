import { selector } from "recoil";

export const products=selector({
    key:'products',
    get:async ({get})=>{
        const res = await fetch('http://localhost:3000/products/');
        const data = await res.json();
        return data;  
    }
})