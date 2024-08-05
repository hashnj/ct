import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { aDress, eMail, pAssword, pHone, term, themeState, username } from "../store/atoms";
import { useNavigate } from "react-router-dom";

export const Form = ({ butText, type, handleSubmit }) => {
    const [userName, setName] = useRecoilState(username);
    const [email, setEmail] = useRecoilState(eMail);
    const [password, setPassword] = useRecoilState(pAssword);
    const [phone, setPhone] = useRecoilState(pHone);
    const [address, setAddress] = useRecoilState(aDress);
    const [theme, setTheme] = useRecoilState(themeState);
    const [terms, setTerms] = useRecoilState(term);
    const [phon, setPhon] = useState(false);
    const nav = useNavigate();

    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, [setTheme]);

    useEffect(() => {
        document.body.classList = theme;
    }, [theme]);

    const validate = (value) => {
        const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
        return emailRegex.test(value);
    };

    return (
        <>
            {type === 'signup' ? (
                <div className='text-text/60 flex flex-col justify-between h-1/2'>
                    <div className='pt-4 pb-3'>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name='name'
                            required
                            onChange={(e) => setName(e.target.value)}
                            className={`border-gray-300 p-2 ${theme === 'dark' ? 'text-background' : 'text-text'} border rounded-lg block w-full`}
                        />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name='email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border-gray-300 p-2 border ${theme === 'dark' ? 'text-background' : 'text-text'} rounded-lg block w-full`}
                        />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="Phone">Phone No.</label>
                        <input
                            type="number"
                            name='phone'
                            required
                            onChange={(e) => setPhone(e.target.value)}
                            className={`border-gray-300 p-2 ${theme === 'dark' ? 'text-background' : 'text-text'} border rounded-lg block w-full`}
                        />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name='password'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border-gray-300 ${theme === 'dark' ? 'text-background' : 'text-text'} p-2 border rounded-lg block w-full`}
                        />
                    </div>
                    <div className='mb-6'>
                        <input
                            type="checkbox"
                            name="terms"
                            onChange={() => {setTerms((s) => !s) 
                                console.log(terms);
                            }}
                            className={`size-4 rounded border cursor-pointer border-gray-300 outline-gray-300 focus:outline-none mt-px mr-2`}
                        />
                        <label htmlFor="terms" className='cursor-pointer'>
                            You accept our terms & conditions
                        </label>
                    </div>
                    <button
                        className='bg-primary text-backgrounds/75 font-bold my-2 py-[6px] rounded-lg'
                        onClick={()=>{
                            // console.log('hii');
                            handleSubmit()
                        }}
                    >
                        {butText}
                    </button>
                </div>
            ) : (type === 'signin' ? (
                <div className='text-text text-lg flex flex-col justify-between h-1/2'>
                    <div className='justify-center w-full  my-4'>
                        <div className="ml-2">Sign-in using:</div>
                        <button className='w-full transition-all duration-300 justify-center flex' onClick={() => setPhon((w) => !w)}>
                            &nbsp; {phon ? <div className="flex  transition-all duration-300 bg-text/10  rounded-md w-full">
                            <div className=" p-2 m-1  transition-all duration-300 w-full scale-75 text-base ">Email/Username</div>
                            <div className={`bg-backgrounds/70 w-full transition-all duration-300 ${!phon?'scale-100':''}  px-6 rounded-lg text-base p-2 m-1`}>Phone-n.</div>
                            </div> 
                            :
                            <div className="flex justify-around bg-text/10  rounded-md w-full">
                                <div className={`bg-backgrounds/70 w-full   transition-all duration-300 rounded-lg text-base p-2 m-1`}>
                                Email/Username
                                </div>
                                <div className="px-4 scale-75 w-full bg p-2 m-1 text-base">Phone-no.</div>
                                </div>
                                }
                        </button>
                    </div>
                    {phon ? (
                        <div className='py-2'>
                            <label htmlFor="email" className="block pb-2 text-sm">Phone Number</label>
                            <input
                                type="number"
                                name='number'
                                placeholder="9001802141"
                                className={`border-gray-300 p-2 px-4 border rounded-lg block w-full ${theme == 'dark' ? 'text-background' : 'text-text'}`}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    ) : (
                        <div className='py-2'>
                            <label htmlFor="email" className="block pb-2 text-sm">Email/Username</label>
                            <input
                                type="text"
                                onChange={(e) => {
                                    if (validate(e.target.value)) {
                                        setEmail(e.target.value);
                                        setName('');
                                    } else {
                                        setName(e.target.value);
                                        setEmail('');
                                    }
                                    setPhone('');
                                }}
                                name='email'
                                placeholder="hashnj@coretechies.in/hashnj"
                                className={`border-gray-300 p-2 px-4 border rounded-lg block w-full ${theme == 'dark' ? 'text-background' : 'text-text'}`}
                            />
                        </div>
                    )}
                    <div className='py-2'>
                        <label htmlFor="password" className="block pb-2 text-sm">Password</label>
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            name='password'
                            placeholder="*********"
                            className={`border-gray-300 ${theme == 'dark' ? 'text-background' : 'text-text'} p-2 border rounded-lg block w-full`}
                        />
                    </div>
                    <div className='mb-6 flex justify-between'>
                        <div>
                            <input
                                type="checkbox"
                                name="terms"
                                className={`size-4 rounded border border-gray-300 outline-gray-300 hover:ring-200 mt-px mr-2`}
                            />
                            <label htmlFor="terms" className='cursor-pointer'>
                                Remember me
                            </label>
                        </div>
                        <div className="text-primary">Forget Password?</div>
                    </div>
                    <button className='bg-primary text-white my-2 py-[6px] rounded-lg' onClick={handleSubmit}>
                        {butText}
                    </button>
                </div>):(<div></div>)
            )}
            {type == 'signup' ? (
                <div className='flex justify-center my-4'>
                    Already Registered?
                    <button className='text-primary' onClick={() => nav('/auth/login')}> Sign In</button>
                </div>
            ) : (type === 'signin' ? (
                <div>
                    
                    <div className='my-4'>
                        <div className='text-center'>
                            <span>Not registered yet?</span>
                            <span className='text-primary cursor-pointer mx-1' onClick={() => nav('/auth/register')}>
                                Create an account
                            </span>
                        </div>
                    </div>
                </div>):(
        <div className='text-text/60 w-full px-5 sm:p-0 sm:w-2/3 lg:w-1/2 flex flex-col justify-between h-1/2'>
                    <div className='pt-4 pb-3'>
                        <label htmlFor="name">Corporation Name</label>
                        <input
                            type="text"
                            name='name'
                            required
                            onChange={(e) => setName(e.target.value)}
                            className={`border-gray-300 p-2 ${theme === 'dark' ? 'text-background' : 'text-text'} border rounded-lg block w-full`}
                        />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="email">Corporation Email</label>
                        <input
                            type="email"
                            name='email'
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            className={`border-gray-300 p-2 border ${theme === 'dark' ? 'text-background' : 'text-text'} rounded-lg block w-full`}
                        />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="Phone">Corp's Phone No.</label>
                        <input
                            type="number"
                            name='phone'
                            required
                            onChange={(e) => setPhone(e.target.value)}
                            className={`border-gray-300 p-2 ${theme === 'dark' ? 'text-background' : 'text-text'} border rounded-lg block w-full`}
                        />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="address">Address of Corp.</label>
                        <textarea
                            name='address'
                            required
                            onChange={(e) => setAddress(e.target.value)}
                            className={`border-gray-300 ${theme === 'dark' ? 'text-background' : 'text-text'} p-2 border rounded-lg block w-full`}
                        />
                    </div>
                    <div className='py-2'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name='password'
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            className={`border-gray-300 ${theme === 'dark' ? 'text-background' : 'text-text'} p-2 border rounded-lg block w-full`}
                        />
                    </div>
                    <div className='mb-6'>
                        <input
                            type="checkbox"
                            name="terms"
                            value={terms}
                            onChange={() => setTerms((s) => !s)}
                            className={`size-4 rounded border cursor-pointer border-gray-300  focus:outline-none text-primary mt-px mr-2`}
                        />
                        <label htmlFor="terms" className='cursor-pointer'>
                            You accept our terms & conditions
                        </label>
                    </div>
                    <button className='bg-primary text-white my-2 py-[6px] rounded-lg' onClick={handleSubmit}>
                        {butText}
                    </button>
        </div>
        )
            )}
        </>
    );
};

