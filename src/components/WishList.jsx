import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRecoilState, useRecoilValue, useRecoilValueLoadable } from "recoil";
import { getWList, wishListState, wList } from "../store/wList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const WishList = ({ size, sub, title,id }) => {
  const [list,setList] = useRecoilState(wishListState);
  const isactive = list.includes(id);
  const nav=useNavigate();
  const wlist=useRecoilValueLoadable(getWList);
  const wlst=useRecoilValueLoadable(wList);

  useEffect(()=>{
    if(wlst.state=='hasValue'){
      console.log(wlst);
    }
  },[list,wlist])
  useEffect(()=>{
    if(wlist.contents.qry && wlist.contents.qry[0].product_id){
      console.log(wlist.contents.qry)
    setList(wlist.contents.qry[0].product_id);
  }
  },[])

  const handleClick = () => {
    // setActive(!active);
    setList(prev=> isactive ? prev.filter(itemId => itemId !==id) : [...prev,id] )
  };

  return (
    <div className="flex w-14 flex-col  justify-center items-center" onClick={()=>{sub?nav('/wishList'):handleClick()}}>
      <div className={`bg-primary peer text-background hover:bg-primary/80 hover:text-text/90 p-2 text-4xl flex items-center justify-center rounded-full size-${size}`}>
        {!sub && isactive ?   <FaHeart />  : <FaRegHeart />}
        {console.log(list)}
      </div>
      <div className={`hidden ${sub ? 'peer-hover:flex' : ''} text-text text-base`}>
        Wishlist
      </div>
    </div>
  );
};
