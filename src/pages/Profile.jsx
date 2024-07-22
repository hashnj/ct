import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { rol, themeState } from "../store/atoms";
import { useRecoilValue } from "recoil";
import { authCheck } from "../store/auth";
import { FaArrowLeft } from "react-icons/fa";

export const Profile=()=>{
    const theme=useRecoilValue(themeState);
    const nav=useNavigate();
    const [edit,setEdit]=useState(false);
    const info=useRecoilValue(authCheck);
    const [userName,setUsername]=useState(info.info.userName);
    const [email,setEmail]=useState(info.info.email);
    const [phone,setPhone]=useState(info.info.phone);
    const [password,setPassword]=useState('');
    const [npassword,setNpassword]=useState('');
    const [address,setAddress]=useState(info.info.addresses);
    useEffect(()=>{
      if(theme){
        document.body.classList=theme
      }
    },[theme])
    return(
               <div className="w-screen flex justify-center items-center h-screen bg-backgrounds text-text">
            <div className="w-4/5 md:w-3/5 h-3/4 shadow-[0_0_10px] rounded-xl shadow-text/55">
                <div className="m-5 flex flex-col h-full">
                    <div className="text-4xl h-1/5">
                    <div className="font-serif p-2 text-primary">Your Profile</div>
                    <div className="text-lg font-extralight ml-3">{`${info.role}`}</div>
                    <div className="rounded-md font-thin text-text/50 flex justify-between ml-2 text-lg">
                        {info.role=='Customer'?<button className="bg-backgrounds p-2" onClick={()=>{
                            nav('/auth/vendor/info')
                        }}>Become a Vendor</button>:<div></div>}
                        {edit?<div></div>:<button className="mr-4 hover:text-primary active:text-text bg-backgrounds" onClick={()=>{setEdit(true)}}>Edit Profile</button>}
                    </div>
                    </div> 
                    <hr className="bg-text/10  h-px border-none"/>
        {edit?(<div className="flex flex-col no-scrool overflow-scroll justify-center relative items-center w-full h-3/5  text-text mt-5">
         <div className="text-3xl absolute right-2 top-0 cursor-pointer text-text" onClick={() => setEdit(false)}>
           X
         </div>
          <div className="w-3/4 h-full">

          <div className="py-4 ">
            UserName:
          <input
            spellCheck="false"
            type="text"
            placeholder="UserName"
            className="bg-transparent font-serif text-xl w-full focus:outline-none"
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
          </div>
          <div className="py-4 ">
            Email:
          <input
            spellCheck="false"
            type="text"
            placeholder="Email"
            className="bg-transparent font-serif text-xl w-full focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          </div>
          <div className="py-4 ">
            Phone No.
          <input
            spellCheck="false"
            type="text"
            placeholder="Phone No"
            className="bg-transparent font-serif text-xl w-full focus:outline-none"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          </div>
          
          <div className="py-4 ">
            Change Password:
          
            <input
            spellCheck="false"
            type="password"
            placeholder="Current Password"
            className="bg-transparent font-serif text-xl w-full focus:outline-none"
            // value={title}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
          spellCheck="false"
          type="password"
          placeholder="New Password"
          className="bg-transparent font-serif text-xl mt-1 w-full focus:outline-none"
          // value={title}
          onChange={(e) => setNpassword(e.target.value)}
        />
          </div>
          <div className="py-4 flex flex-col ">
          

            <div>Address</div>
          <input
            spellCheck="false"
            type="text"
            placeholder="Addresses"
            className="bg-transparent font-serif text-xl w-full focus:outline-none"
            value={address}
            // onChange={(e) => setTitle(e.target.value)}
          />
          {info.info.addresses.length==0 ? "*add new Address":<div className="pt-1" onClick={()=>{}}>Add new Address</div>}
          </div>
          <button className="bg-primary text-xl px-4 py-1 rounded-md" onClick={()=>{}}>
            Save
          </button>
          </div>
      </div>):(<div className="h-3/5 overflow-y-scroll overflow-x-hidden no-scrool">
                        <div className="m-2 flex w-full flex-col">
                        <div className="flex py-2 justify-between  px-5 pr-10 w-full text-3xl text-text/70">
                                
                                
                            </div>
                            <div className="flex py-2 justify-between items-center px-5 pr-10 w-full text-3xl text-text/70">
                                <div className="font-semibold">Username:</div>
                                <div>{info.info.userName || info.info.userr.userName  }</div>
                            </div>
                            <div className="flex py-2 justify-between px-5 pr-10 w-full text-3xl text-text/70">
                                <div className="font-semibold">Email:</div>
                                <div>{info.info.email || info.info.userr.email}</div>
                            </div>
                            <div className="flex py-2 justify-between px-5 pr-10 w-full text-3xl text-text/70">
                                <div className="font-semibold">Phone No:</div>
                                <div>{info.info.phone || info.info.userr.phone}</div>
                            </div>
                            <div className="flex py-2 justify-between px-5 pr-10 w-full text-3xl text-text/70">
                                <div className="font-semibold">Addresses:</div>
                                <div>{info.info.addresses?(info.info.addresses.length==0?'No Data':info.info.addresses) : info.info.userr.addresses.length==0?'No data':'h' }</div>
                            </div>
                            
                            
                        </div>
                    </div>)} 
                    <div className="h-1/6 pt-5 flex justify-center text-primary/80 px-6">
                    <div className="w-full ">
                    <button title="Back" onClick={()=>nav(-1)} className="text-2xl flex justify-center py-1 rounded-lg hover:bg-primary/70 text-text/70 bg-primary w-12 "><FaArrowLeft/></button>
                    </div>
                    <div title="Trademark LOL" className="mb-2 font-serif cursor-pointer h-8 text-xl flex justify-center items-center">CoreCart</div>

                    </div>
                    
                </div>
            </div>
        </div>
    )
}