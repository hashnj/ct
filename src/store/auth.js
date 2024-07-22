import { atom, selector } from "recoil";

export const auth = atom({
    key: 'auth',
    default: false
});

export const authCheck = selector({
    key: 'check',
    get: async ({ get }) => {
        try {
            // const status = get(auth);
            const res = await fetch('http://localhost:3000/user/auth',{
                method:'post',
                headers:{
                    'Content-type': 'application/json',
                    'Authorization': localStorage.getItem('token')
                }
            });
            const data = await res.json();
            console.log(data);
            if (data.success) {
                console.log(data);
                return data;
            }
            return false;
        } catch (error) {
            console.error("Error fetching auth status:", error);
            return false;
        }
    }
});
