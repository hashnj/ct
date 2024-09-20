import { IoIosRemoveCircle } from "react-icons/io";
import { useRecoilState } from "recoil";
import { wishListState } from "../store/wList";

const WishPageComponent = ({ title, description, image, price,id }) => {
 const [list,setList] = useRecoilState(wishListState)
 const isactive = list.includes(id);
  const removeItem = async () => {
    console.log(id)
    setList(prev => isactive ? prev.filter(itemId => itemId !== id) : [...prev, id]);
  }
  return (
    <div className="w-full grid my-3 grid-cols-4 p-6 items-center px-10 bg-text/25 rounded-md">
      <div className="flex col-span-3 justify-start items-center">
        <div className="flex justify-center items-center rounded-md overflow-hidden">
          <img src={image} className="max-w-28 "  alt="" />
        </div>
        <div className="flex pl-6 text-text/70 flex-col">
          <span className="text-3xl font-extrabold">{title}</span>
          <span className="text-lg font-thin">{description}</span>
        </div>
      </div>
      <div className="flex col-span-1 justify-end">
        <div className="pr-2 text-primary w-24 font-bold drop-shadow-[1px_1px_1px_rgb(225,225,225)] text-xl">
          ${price}
        </div>
        <div className="text-3xl text-red-600">
          <IoIosRemoveCircle className="cursor-pointer" onClick={()=>{
            removeItem();
          }}/>
        </div>
      </div>
    </div>
  );
};

export default WishPageComponent;
