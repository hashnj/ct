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
                <div className='text-text flex flex-col justify-between h-1/2'>
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
                    <div className='flex justify-center my-4'>
                        Sign-in using:
                        <button className='text-primary' onClick={() => setPhon((w) => !w)}>
                            &nbsp; {phon ? 'Email/Username' : 'Phone-no.'}
                        </button>
                    </div>
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





// <div className='flex px-2 mt-8'>
// <div className='flex mx-12 justify-around w-full'>
//   <div className='p-1 rounded-full border border-text/40 cursor-pointer hover:border-primary' >
//     <svg viewBox="0 0 32 32" data-name="Layer 1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" fill="#000000" className='size-8'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M23.75,16A7.7446,7.7446,0,0,1,8.7177,18.6259L4.2849,22.1721A13.244,13.244,0,0,0,29.25,16" fill="#00ac47"></path><path d="M23.75,16a7.7387,7.7387,0,0,1-3.2516,6.2987l4.3824,3.5059A13.2042,13.2042,0,0,0,29.25,16" fill="#4285f4"></path><path d="M8.25,16a7.698,7.698,0,0,1,.4677-2.6259L4.2849,9.8279a13.177,13.177,0,0,0,0,12.3442l4.4328-3.5462A7.698,7.698,0,0,1,8.25,16Z" fill="#ffba00"></path><polygon fill="#2ab2db" points="8.718 13.374 8.718 13.374 8.718 13.374 8.718 13.374"></polygon><path d="M16,8.25a7.699,7.699,0,0,1,4.558,1.4958l4.06-3.7893A13.2152,13.2152,0,0,0,4.2849,9.8279l4.4328,3.5462A7.756,7.756,0,0,1,16,8.25Z" fill="#ea4435"></path><polygon fill="#2ab2db" points="8.718 18.626 8.718 18.626 8.718 18.626 8.718 18.626"></polygon><path d="M29.25,15v1L27,19.5H16.5V14H28.25A1,1,0,0,1,29.25,15Z" fill="#4285f4"></path></g>
//     </svg>
//     </div>
//     <div className='p-1 rounded-full border border-text/40 cursor-pointer  hover:border-primary'>
//       <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className='size-8'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <circle cx="16" cy="16" r="14" fill="url(#paint0_linear_87_7208)"></circle> <path d="M21.2137 20.2816L21.8356 16.3301H17.9452V13.767C17.9452 12.6857 18.4877 11.6311 20.2302 11.6311H22V8.26699C22 8.26699 20.3945 8 18.8603 8C15.6548 8 13.5617 9.89294 13.5617 13.3184V16.3301H10V20.2816H13.5617V29.8345C14.2767 29.944 15.0082 30 15.7534 30C16.4986 30 17.2302 29.944 17.9452 29.8345V20.2816H21.2137Z" fill="white"></path> <defs> <linearGradient id="paint0_linear_87_7208" x1="16" y1="2" x2="16" y2="29.917" gradientUnits="userSpaceOnUse"> <stop stopColor="#18ACFE"></stop> <stop offset="1" stopColor="#0163E0"></stop> </linearGradient> </defs> </g></svg>
//     </div >
//     <div className='p-2 rounded-full border border-text/40 cursor-pointer  hover:border-primary'>
//     <svg viewBox="-1.5 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#000000" className='size-6'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>apple [#173]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-102.000000, -7439.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M57.5708873,7282.19296 C58.2999598,7281.34797 58.7914012,7280.17098 58.6569121,7279 C57.6062792,7279.04 56.3352055,7279.67099 55.5818643,7280.51498 C54.905374,7281.26397 54.3148354,7282.46095 54.4735932,7283.60894 C55.6455696,7283.69593 56.8418148,7283.03894 57.5708873,7282.19296 M60.1989864,7289.62485 C60.2283111,7292.65181 62.9696641,7293.65879 63,7293.67179 C62.9777537,7293.74279 62.562152,7295.10677 61.5560117,7296.51675 C60.6853718,7297.73474 59.7823735,7298.94772 58.3596204,7298.97372 C56.9621472,7298.99872 56.5121648,7298.17973 54.9134635,7298.17973 C53.3157735,7298.17973 52.8162425,7298.94772 51.4935978,7298.99872 C50.1203933,7299.04772 49.0738052,7297.68074 48.197098,7296.46676 C46.4032359,7293.98379 45.0330649,7289.44985 46.8734421,7286.3899 C47.7875635,7284.87092 49.4206455,7283.90793 51.1942837,7283.88393 C52.5422083,7283.85893 53.8153044,7284.75292 54.6394294,7284.75292 C55.4635543,7284.75292 57.0106846,7283.67793 58.6366882,7283.83593 C59.3172232,7283.86293 61.2283842,7284.09893 62.4549652,7285.8199 C62.355868,7285.8789 60.1747177,7287.09489 60.1989864,7289.62485" id="apple-[#173]"> </path> </g> </g> </g> </g></svg>
//     </div>
//     <div className='p-2 rounded-full border border-text/40 cursor-pointer  hover:border-primary'>
//     <svg viewBox="0 -4 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg"  fill="#000000" className='size-6'><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Twitter-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-300.000000, -164.000000)" fill="#00AAEC"> <path d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283" id="Twitter"> </path> </g> </g> </g></svg>
//     </div>
// </div>
// </div>