import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getWList, wishListState, wList } from "../store/wList";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const WishList = ({ size, sub, title, id }) => {
  const [list, setList] = useRecoilState(wishListState);
  const isactive = list?.includes(id);
  const nav = useNavigate();
  const wlist = useRecoilValueLoadable(getWList);
  const w = useRecoilValueLoadable(wList);

  useEffect(() => {
    if (wlist.state === 'hasValue' && wlist.contents.qry && wlist.contents.qry[0]?.product_id) {
      setList(wlist.contents.qry[0]?.product_id);
    }
  }, [wlist, setList]);

  useEffect(() => {
    if (w.state === 'hasValue') {
      // console.log(w);
    }
    // console.log(list, w, wlist);
  }, [list, w, wlist]);

  const handleClick = () => {
    setList(prev => isactive ? prev.filter(itemId => itemId !== id) : [...prev, id]);
  };

  const handleNavigate = () => {
    nav('/wishlist');
    window.location.reload();
  };

  return (
    <div className="flex w-14 flex-col justify-center items-center" onClick={sub ? handleNavigate : handleClick}>
      <div className={`bg-text/30 peer text-red-600 hover:bg-text/40 p-2 text-4xl flex items-center justify-center rounded-full size-${size}`}>
        {!sub && isactive ? <FaHeart className="active:scale-75 hover:scale-95" /> : <FaRegHeart className="active:scale-75 hover:scale-95" title="Wishlist" />}
      </div>
      {sub && <div className="hidden peer-hover:flex text-text text-base">Wishlist</div>}
    </div>
  );
};
