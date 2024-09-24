import { useRecoilState } from "recoil";
import { addAddress } from "../store/addAddress";
import { useState } from "react";
import { B_Url } from "../config";
import { address } from "../store/address";

export const AddAddress = () => {
  const [add, setAdd] = useRecoilState(addAddress);
  const [adres, setAddress] = useRecoilState(address);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCheckbox = (e) => {
    setAddress(prevState => ({
      ...prevState,
      def: e.target.checked
    }));
  };

  const handleSelectChange = (e) => {
    setAddress(prevState => ({
      ...prevState,
      type: e.target.value
    }));
  };

  async function addAddres() {
    try {
      const response = await fetch(`${B_Url}/user/address`, {
        method: "POST",
        body: JSON.stringify(adres),
        headers: {
          "Content-Type": "application/json",
          "authorization": localStorage.getItem('token')
        }
      });
      const data = await response.json();
      console.log(data);

      if (data) {
        setAdd(false); 
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div className={`block ${add ? 'opacity-100' : 'opacity-0'} transition-all duration-300`}>
      <div>
        <span className="text-base">Set address type: </span>
        <select
          name="type"
          id="type"
          value={adres.type}
          onChange={handleSelectChange}
          className="ml-1 w-[49%] focus:ring-primary focus:border-none focus:ring-2 active:ring-primary bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
        >
          <option value="home">Home Address</option>
          <option value="work">Work Address</option>
        </select>
      </div>
      <input
        className="w-full focus:ring-primary focus:border-none active:ring-primary focus:ring-2 bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
        type="text"
        name="address"
        placeholder="Address"
        onChange={handleChange}
      />
      <div className="flex">
        <input
          type="text"
          className="w-full mr-1 focus:ring-primary focus:border-none active:ring-primary focus:ring-2 bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
          name="pin"
          placeholder="Postal Code"
          onChange={handleChange}
        />
        <input
          type="text"
          className="w-full ml-1 focus:ring-primary focus:border-none active:ring-primary focus:ring-2 bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
      </div>
      <div className="flex">
        <input
          type="text"
          className="w-full mr-1 focus:ring-primary focus:border-none active:ring-primary focus:ring-2 bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
          name="state"
          placeholder="State"
          onChange={handleChange}
        />
        <input
          type="text"
          className="w-full ml-1 focus:ring-primary focus:border-none active:ring-primary focus:ring-2 bg-backgrounds/50 p-2 mb-2 border-text/5 rounded"
          name="country"
          placeholder="Country"
          onChange={handleChange}
        />
      </div>
      <label htmlFor="def">
        <input
          type="checkbox"
          name="def"
          className="rounded focus:ring-primary mb-1 focus:accent-primary focus:bg-primary text-primary"
          checked={adres.def}
          onChange={handleCheckbox}
        />
        <span className="text-base"> Set as default address</span>
      </label>
      <div className="w-full flex justify-around text-xl">
        <button
          className="focus:ring-primary h-10 mx-1 w-full focus:border-none active:ring-primary focus:ring-2 bg-backgrounds/50 pb-1 px-4 mb-2 border rounded"
          onClick={() => {
            setAdd(false);
            setAddress({ address: '', pin: '', city: '', state: '', country: '', type: 'home', def: false });
          }}
        >
          Cancel
        </button>
        <button
          className="bg-primary w-full mx-1 h-10 pb-1 px-4 rounded mb-2"
          onClick={addAddres}
        >
          Add
        </button>
      </div>
    </div>
  );
};
