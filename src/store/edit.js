import { atom } from "recoil";

export const EditV=atom({
    key:'value',
    default:{
        category: '',
        name: '',
        description: '',
        mrp:'',
        price: '',
        stock: '',
        image: '',
    }
});

export const EditC=atom({
    key:'CatV',
    default:{
        itemType:'category',
        name:"",
        description:"",
        isSubCategory:false,
        parent:''
    }
});