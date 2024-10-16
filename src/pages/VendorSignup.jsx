import { useNavigate } from "react-router-dom"
import { Form } from "../components/Form"
import { useRecoilValue } from "recoil";
import { aDress, eMail, pAssword, pHone, term, themeState, username } from "../store/atoms";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { B_Url } from "../config";

export const VendorSignup=()=>{

    const nav=useNavigate();
    const userName = useRecoilValue(username);
    const email = useRecoilValue(eMail);
    const password = useRecoilValue(pAssword);
    const phone = useRecoilValue(pHone);
    const address = useRecoilValue(aDress);
    const terms = useRecoilValue(term);
    const [error, setError] = useState('');
    const [statuss, setStatus] = useState('');
    const theme = useRecoilValue(themeState);


    useEffect(() => {
        document.body.classList = theme;
        console.log(localStorage.getItem('token'));
      }, []);
    
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
    
    const validate = (v) => {
        const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        return emailRegex.test(v);
    };



    const handleSubmit=async ()=>{
      if(terms){
        if(!validate(email)){
          setError('Invalid Email Address')
          return;
        }
        try {
            console.log(userName, email, phone, password,address);
      
            const body = { userName, email, phone,password,address,role:'Vendor'};
            console.log(body);
            console.log(localStorage.getItem('token'))
            const req = await fetch(`${B_Url}/user/signup`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'authorization':localStorage.getItem('token')
              },
              body: JSON.stringify(body)
            });
      
            const data = await req.json();
            console.log(data);
            if(data.token){
              setStatus('Registered');
              console.log('registered');
              console.log(data.token);
              localStorage.setItem('token', data.token);
              nav('/vendor' , {replace:true});
            }
            else if (data.error) {
              setError(data.error);
              console.log(data.error)
            } else{
              console.log(data.token);
            }
          } catch (e) {
            console.log(e);
          }

        }
        else{
          setError('Terms & Conditions')
          console.log('Terms & Conditions')
        }
    }
    return(
        <>
        <ToastContainer></ToastContainer>
        <div className="w-screen h-full min-h-screen flex flex-col justify-center items-center bg-backgrounds">
            <div className="text-3xl text-primary font-serif">Register as a Vendor</div>
        <Form type={'vendor'} butText={"Register your Business"} handleSubmit={handleSubmit}/>
        </div>
        </>
    )
}