import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Form } from "../components/Form";
import { useRecoilState, useRecoilValue } from "recoil";
import { eMail, pAssword, pathh, pHone, rolee, term, themeState, username } from "../store/atoms";
import { Cart } from "../assets/Svg";

export const Signup = () => {
    const nav = useNavigate();
    const userName = useRecoilValue(username);
    const email = useRecoilValue(eMail);
    const password = useRecoilValue(pAssword);
    const phone = useRecoilValue(pHone);
    const terms = useRecoilValue(term);
    const [error, setError] = useState('');
    const [statuss, setStatus] = useState('');
    const theme = useRecoilValue(themeState);
    const [path,setPath]=useRecoilState(pathh);
    const [role,setRole]=useRecoilState(rolee);
    const [visible ,setVisible] = useState(false);


    let visibleInterval;



    useEffect(() => {
        if (error) {
            toast.error(error, {
                position: "top-center",
                autoClose: 1000,
                closeButton: false,
                closeOnClick: true,
                hideProgressBar: true,
                className: "bg-text/40 w-1/2 mx-auto",
                stacked: true,
                newestOnTop: true
            });
        }
        if (statuss) {
            toast.success(statuss, {
                position: "top-center",
                autoClose: 1000,
                closeButton: false,
                closeOnClick: true,
                hideProgressBar: true,
                className: "bg-text/40 w-1/2 mx-auto"
            });
        }
    }, [error, statuss]);

    useEffect(() => {
        document.body.classList = theme;
    }, [theme]);

    useEffect(()=>{
        visibleInterval = setInterval(() => {
            setVisible(true)
        }, 800);

        return ()=>{
            clearInterval(visibleInterval);
        }
    },[visible])

    const validate = (v) => {
        const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        return emailRegex.test(v);
    };

    const handleSubmit = async () => {
      console.log(email,userName,password,phone,terms);
        if (!validate(email)) {
            setError("Invalid Email");
            return;
        }
        if (!terms) {
            setError('You must accept the terms & conditions');
            return;
        }
        try {
            const body={userName,
                email,
                phone,
                password,
                role
            }
            const req = await fetch('http://localhost:3000/user/signup', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const data = await req.json();
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else if(data.token){
                setStatus('Registered');
                localStorage.setItem('token', data.token);
                console.log(path);
                nav(path);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className='w-screen flex min-h-lvh bg-background text-text'>
                <div className='w-full min-h-lvh hidden lg:flex justify-center items-center bg-gradient-to-br from-primary via-primary/30 to-primary'>
                    <div className='bg-backgrounds/40 rounded-md p-16'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="text-background h-[78px] w-[78px] -ml-2 iconify iconify--heroicons" width="1em" height="1em" viewBox="0 0 24 24">
                                <path fill="currentColor" fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643z" clipRule="evenodd"></path>
                            </svg>
                        </div>
                        <div>
                            <div className='text-4xl font-bold text-gray-600 my-2'>Unlock <br /> Your Purchasing</div>
                            <div className='text-4xl font-semibold my-3'>Performance</div>
                            <div className='text-2xl text-wrap mt-3'>You will always GET everything. <br />But you will need more...</div>
                        </div>
                    </div>
                </div>
                <div className='w-full h-full flex justify-center items-center my-auto'>
                    <div className='lg:w-1/2 w-[300px]'>
                        <div className='py-3 flex justify-center cursor-pointer text-primary text-4xl font-serif' onClick={() => nav('/dashboard')}> CoreCart <Cart/> </div>
                        <div>
                            <h1 className='py-4 font-bold  text-2xl'>Hey, Hello 👋</h1>
                            <div className={`flex flex-col p-1 text-text w-full ${visible ? 'animate-fadeIn ':' hidden'}`}>
                                <div className="py-1">Register as : </div>
                                <div className="bg-text/10 rounded-md flex justify-center transition-all  w-full">
                        <button className={`w-full ${role=='Customer'?'bg-backgrounds/70':'text-sm hover:bg-background/60'} h-10 p-2 m-px transition-all  rounded-lg`} onClick={()=>{
                            setPath('/')
                            setRole('Customer');
                    
                        }}>
                            Customer
                        </button>
                        <button className={`w-full ${role=='Vendor'?'bg-backgrounds/70':'text-sm hover:bg-background/60'} p-2 transition-all  rounded-lg m-px`} onClick={()=>{
                            setPath('/auth/register/vendor')
                            setRole('Vendor')
                        }
                        }>Vendor</button>
                        <button className={`w-full ${role=='Admin'?'bg-backgrounds/70':'text-sm hover:bg-background/60'} p-2 transition-all  rounded-lg m-px`} onClick={()=>{
                            setPath('/dashboard')
                            setRole('Admin');
                    
                        }}>
                            Admin
                        </button> 
                            </div>
                        </div>
                            <p className={`text-text/60 ${visible ? 'animate-fadeIn':'hidden'}`}>{role==='Vendor'?'Enter Vendor Details:':role=='Admin'?'Enter Admin Details:':'Create a new user account:'}</p>
                        </div>
                        <div className={`${
                            visible ? ' h-full' : ' h-0 hidden'
                            } transition-all duration-500`}
                        >
                        <Form butText={'Create an Account'} type={'signup'} handleSubmit={handleSubmit} />
                        </div>
                        
                        <div className={`text-text font-mono ${visible?'hidden h-0':'h-full'} transition-all font-extrabold text-5xl`}>
                            Signing-up
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
