import { atom } from "recoil";

export const address = atom({
  key:'addresss',
  default:{ address: '', pin: '', city: '', state: '', country: '', type: 'home', def: false }
})  