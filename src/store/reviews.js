import { atom, selectorFamily } from 'recoil';
import axios from 'axios';
import { B_Url } from '../config';


export const reviewsAtom = atom({
  key: 'reviewsAtom',
  default: {}, 
});

export const reviewsSelector = selectorFamily({
  key: 'reviewsSelector',
  get: (productId) => async ({ get }) => {
    try {
      const { data } = await axios.get(`${B_Url}/reviews/${productId}`);
      return data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  },
});

export const hasBoughtSelector = selectorFamily({
  key: 'hasBoughtSelector',
  get: (productId) => async () => {
    try {
      const { data } = await axios.get(`${B_Url}/reviews/hasBought/${productId}`, {
        headers: { Authorization: `${localStorage.getItem('token')}` },
      });
      return data; 
    } catch (error) {
      console.error('Error checking purchase status:', error);
      return false;
    }
  },
});
