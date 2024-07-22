import { selector } from "recoil";

export const products=selector({
    key:'products',
    get:async ({get})=>{
        const res = await fetch('http://localhost:3000/products/',{
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
        const res = await fetch('http://localhost:3000/categories/',{
            headers:{
                'authorization':localStorage.getItem('token')
            }
        });
        const data = await res.json();
        console.log(data);
        return data;
    }
})