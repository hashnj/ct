import { atom, selector } from "recoil";

export const cartState = atom({
    key: 'cart',
    default: []
});

export const getCart = selector({
    key: 'getCart',
    get: async ({ get }) => {
        const req = await fetch('http://localhost:3000/products/cart', {
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
        await fetch('http://localhost:3000/products/cart', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': localStorage.getItem('token')
            },
            body: JSON.stringify({ list })
        });
    }
});
