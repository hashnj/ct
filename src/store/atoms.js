import {atom, selector} from 'recoil'
import { authCheck } from './auth'
export const username = atom({
    key:'userName',
    default:''
})
export const eMail = atom({
    key:'email',
    default:''
})
export const pAssword = atom({
    key:'password',
    default:''
})
export const pHone = atom({
    key:'phone',
    default:''
})

export const themeState = atom({
    key:'theme',
    default:localStorage?.getItem('theme')||(window.matchMedia("(prefers-color-scheme: dark)")?'dark':'light')
})
export const aDress = atom({
    key:'address',
    default:''
})
export const term = atom({
    key:'terms',
    default:false
})
export const rolee = atom({
    key:'role',
    default:'Customer'
})
export const pathh = atom({
    key:'path',
    default:'/'
})
export const rol = selector({
    key:'r',
    get: ({ get }) => {
        const authData = get(authCheck);
        return authData.role || [];
    },
})

// export const tHeme = selector({
//     key:'theme',
//     get:({get})=>{
//         const theme=localStorage.getItem('theme')
//         return theme;
//     }
// })
