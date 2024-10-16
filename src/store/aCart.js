import { atom, selector } from "recoil";
import { B_Url } from "../config";

export const cartState = atom({
    key: 'cart',
    default: []
});

export const getCart = selector({
    key: 'getCart',
    get: async ({ get }) => {
        const req = await fetch(`${B_Url}/products/cart`, {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        });
        const data = await req.json();
        return data;
    }
});

export const cartUpdate = selector({
    key: 'cartUpdate',
    get: async ({ get }) => {
        const list = get(cartState);
        await fetch(`${B_Url}/products/cart`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ list })
        });
    }
});
