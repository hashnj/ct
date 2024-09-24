import { useRecoilValue } from "recoil";
import { themeState } from "../store/atoms";
import { useEffect, useState } from "react";
import  { Nav }  from "../components/Nav";

export const Success = () => {
  const theme = useRecoilValue(themeState);
  const [imageScaled, setImageScaled] = useState(false);

  useEffect(() => {
    document.body.classList = `${theme} bg-background`;

    setTimeout(() => {
      setImageScaled(true);
    }, 10); 
  }, [theme]);

  return (
    <div className="min-w-screen bg-background min-h-screen w-full h-full flex items-center flex-col">
      <Nav />
      <img
        className={`max-w-[40%] w-2/5 pt-20 transition-transform duration-700 ease-in-out ${
          imageScaled ? 'scale-100' : 'scale-50'
        }`}
        src="https://cloud.helios.id/wp-content/uploads/2023/12/cba0329b5a9a08785cb21205bdc2e01d-1024x762.png"
        alt="Order success"
      />
      <div className="text-text pt-8 text-2xl font-semibold">
        Order Placed Successfully..
      </div>
      <div className="mt-6 underline">Order Status</div>
    </div>
  );
};
