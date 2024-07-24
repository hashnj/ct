import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Form } from "../components/Form";
import { eMail, pAssword, pHone, rol, themeState, username } from "../store/atoms";
import { useRecoilValue } from "recoil";
import { auth } from "../store/auth";
import { Cart } from "../assets/Svg";

export const Signin = () => {
  const nav = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/'
  const userName = useRecoilValue(username);
  const email = useRecoilValue(eMail);
  const password = useRecoilValue(pAssword);
  const phone = useRecoilValue(pHone);
  const [error, setError] = useState('');
  const [statuss, setStatus] = useState('');
  const [rem, setRem] = useState(false);
  const theme = useRecoilValue(themeState);
  const [send,setSend] =useState('');
  const role=useRecoilValue(rol);

  useEffect(() => {
    console.log(role);
    document.body.classList = theme;
    
    if(auth.role==='Admin'){
      console.log(auth.role)
      nav('/dashboard');
    }
    else if(auth.role){
      nav('/');
    }
  



  }, []);
  useEffect(()=>{
    if (!validate(email)) {
      if (userName) {
        setSend('userName');
      } else {
        setSend('phone');
      }
    } else {
      setSend('email');
    }
  },[email,password,phone])

  useEffect(() => {
    if (error) {
      setStatus('');
      toast.error(error, {
        position: "top-center",
        autoClose: 1000,
        closeButton: false,
        closeOnClick: true,
        hideProgressBar: true,
        className: "bg-text/40 text-text w-1/2 mx-auto",
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
        className: "bg-text/40 text-text w-1/2 mx-auto"
      });
    }
  }, [error, statuss]);

  const validate = (v) => {
    const emailRegex = new RegExp(
      '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
    );
    return emailRegex.test(v);
  };

  // const handleInput = (e) => {
    
  // };

  const handleSubmit = async () => {
    const b=validate(email);
    try {
      console.log(userName, email, phone, password, send);

      const body = { password: password };

      if (send === 'email') {
        if(!error){
        setStatus('Trying Email Login')
        }
        body.email = email;
        console.log(body.email);
      } else if (send === 'userName') {
        if(!error){
        setStatus('Username Login')
        }
        body.userName = userName;
        console.log(body.userName);
      } else if(send === 'phone'){
        if(!error){
        setStatus('Phone number login')
        }
        body.phone = phone;
      }
      console.log(body);
      try{
      const req = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });

      const data = await req.json();
      console.log(data);

      if (data.error) {
        console.log(data.error,data);
        setError(data.error);
      } else if (data.token) {
        setStatus('logging-in');
        localStorage.setItem('token', data.token);
        console.log(from);
        nav(from, { replace:true });
      }else{
        setError('Internal Setver Error!!! please try again');
      }}
      catch(e){
        console.log(e);
        setError(e);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='w-screen flex min-h-lvh  bg-background text-text'>
      <div className='w-full  min-h-lvh   hidden lg:flex  justify-center  items-center bg-gradient-to-br from-primary via-primary/30 to-primary'>
        <div className='bg-backgrounds/40 rounded-md p-16'>
          <div className="">
          <svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img" className="text-background h-[78px] w-[78px] -ml-2 iconify iconify--heroicons" width="1em" height="1em" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643z" clipRule="evenodd"></path></svg>
          </div>
          <div>
            <div className='text-4xl font-bold text-gray-600 my-2'>Unlock <br /> Your Project</div>
            <div className='text-4xl font-semibold my-3'>Performance</div>
            <div className='text-2xl text-wrap mt-3'>You will never know everything. <br />
            But you will know more...</div>
          </div>
        </div>

      </div>
        <div className='w-full h-full flex justify-center items-center my-auto'>
          <div className='w-1/2 '>
            <div className='py-5 flex justify-center cursor-pointer text-primary text-4xl font-serif' onClick={() => {
              nav('/dashboard')
            }} >
              CoreCart <Cart/>
            </div>
            <div>
              <h1 className='pt-4 font-bold text-2xl'>Hey, Hello 👋</h1>
              <p className='text-text pb-2'>Enter the information you entered while registering</p>
            </div>
            <Form type={'signin'} butText={'Login'} handleSubmit={handleSubmit}/>
            {/* <div className='flex px-2 mt-8'>
            <div className='flex mx-12 justify-around w-full'>
              <div className='p-1 rounded-full border border-text/30  hover:border-blue-500' >
                <svg viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#000000" className='size-8'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47"></path><path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4"></path><path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00"></path><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"></polygon><path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435"></path><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"></polygon><path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"></path></g>
                </svg>
                </div>
                <div className='p-1 rounded-full border border-text/50  hover:border-primary'>
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="size-8 fill-slate-900"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.607 9.607 0 0 1 12 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48 3.97-1.32 6.833-5.054 6.833-9.458C22 6.463 17.522 2 12 2Z"></path></svg>
                </div >
                <div className='p-1 rounded-full border border-gray-400  hover:border-blue-500'>
                  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='size-8'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"></circle> <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"></path> <defs> <linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse"> <stop stopColor="#18ACFE"></stop> <stop offset="1" stopColor="#0163E0"></stop> </linearGradient> </defs> </g></svg>
                </div >
                <div className='p-2 rounded-full border border-gray-400  hover:border-blue-500'>
                <svg viewBox="0 -4 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#000000" className='size-6'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Twitter-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-300.000000, -164.000000)" fill="#00AAEC"> <path d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283" id="Twitter"> </path> </g> </g> </g></svg>
                </div>
            </div>

            </div> */}
            {/* <div 
            className='flex justify-center my-4'>
              Sign-in using:
              <button className='text-primary' onClick={()=>{
                setPhon((w)=>!w)
                // console.log(phone);
                }}>&nbsp; {phon?'Email/Username':'Phone-no.'}</button>
            </div>
            <div className='my-4'>
              <div className='text-center'>
                <span>Not registered yet?</span>
                <span className='text-primary cursor-pointer mx-1' onClick={() => {
                  nav('/auth/register')
                }}>Create an account</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  )
}




















// if(!us){
      //   try{
      //     console.log(us,em,ph,pw);
      //     const req=await fetch('http://localhost:3000/user/login',{
      //       method:'post',
      //       headers:{
      //         'Content-type':'application/json'
      //       },
      //       body:JSON.stringify({
      //         phone:ph,
      //         password:pw
      //       })
      //     });
      //     const data=await req.json();
      //     console.log(data);
      //     if(data.error){
      //       setError(data.error);
      //     }else if(data.token){
      //       setStatus('Registered');
      //       localStorage.setItem('token',data.token);
      //       nav('/dashboard');
      //     }
      //   }
      //   catch(e){
      //     console.log(e)
      //   }  
      // }
      // else{
      //   try{
      //     console.log(us,em,ph,pw);
      //     const req=await fetch('http://localhost:3000/user/login',{
      //       method:'post',
      //       headers:{
      //         'Content-type':'application/json'
      //       },
      //       body:JSON.stringify({
      //         username:us,
      //         password:pw
      //       })
      //     });
      //     const data=await req.json();
      //     console.log(data);
      //     if(data.error){
      //       setError(data.error);
      //     }else if(data.token){
      //       setStatus('Registered');
      //       localStorage.setItem('token',data.token);
      //       nav('/dashboard');
      //     }
      //   }
      //   catch(e){
      //     console.log(e)
      //   }
      // }