import { selector } from "recoil";

export const detailsSelector = selector({
    key: 'detailsSelector',
    get: async ({ get }) => {
        try {
            const res = await fetch('http://localhost:3000/data', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await res.json();
            if (data) {
                return data;
            } else {
                return null;
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            return null; 
        }
    }
});
