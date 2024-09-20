import { useEffect, useState } from "react";
import { Nav } from "../components/Nav";
import { SideBar } from "../components/SideBar";
import AddProduct from "../components/AddProduct";
import AddCategory from "../components/AddCategory";
import EditItem from "../components/EditItem";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { addC, addP, edit, Show } from "../store/listing";
import { PnL } from "../components/PnL";
import { EditC, EditV } from "../store/edit";
import { categories } from "../store/products";
import { Edit } from "../assets/Svg";
import { sideBar } from "../store/dash";
import { themeState } from "../store/atoms";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ToastContainer } from "react-toastify";

export const Listing = () => {
  const [ap, setAddP] = useRecoilState(addP);
  const [ac, setAddC] = useRecoilState(addC);
  const [ed, setEd] = useRecoilState(edit);
  const [show, setShow] = useRecoilState(Show);
  const [categorie, setCategories] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  // const [edt, setEdt] = useRecoilState(EditV);
  // const [edtc,setEdtc] = useRecoilState(EditC);
  

  const category = useRecoilValueLoadable(categories);
  const active = useRecoilValue(sideBar);
  const theme = useRecoilValue(themeState)

  useEffect(() => {
    if (show) {
      setLoading(true);
      if (category.state === 'hasValue') {
        console.log(category)
        setCategories(category.contents);
        setLoading(false);
      } else if (category.state === 'hasError') {
        setError('Error loading categories');
        setLoading(false);
      }
    }
    console.log(categorie)
  }, [show, category.state, category.contents]);

  useEffect(()=>{
    document.body.classList=theme
  },[theme])

  return (
    <div className="w-screen min-h-screen bg-backgrounds  h-full relative text-text flex justify-center items-center">
      <Nav />
      <SideBar top="Your-Listings" />
      <ToastContainer />
      <div className={`h-full transition-all duration-300 w-full ${active?' sm:w-3/5 lg:w-5/6 sm:ml-64 ' : 'sm:w-11/12 '}  text-text `}>
        <div className="text-primary font-serif ml-4 mt-2 text-2xl md:text-3xl">
            Your Products And Listings
          </div>
        <div className="p-4 w-full  bg-background h-full rounded-xl overflow-scroll no-scrool">
          
          <PnL />
          {ed && <div>
                <div className="z-10" onClick={()=>{
                setEd(false)
            }}> </div> 
            <EditItem/></div>}
        </div>
      </div>
    </div>
  );
};
