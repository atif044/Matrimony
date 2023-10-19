import React,{useContext} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import context from '../Context/context.js';
const Navbar = () => {
    const Navigate=useNavigate();
    const [navbar, setNavbar] = React.useState(false);
    const {token,logOut,typeAdmin}=useContext(context)
    const onClick=async()=>{
        try {
        
            const res=await logOut();            
            if(res?.msg){
                toast.success(res.msg);
            }
            Navigate("/login")
    } catch (error) {
        toast.error("Srever Down")
    }
    }
    let elements2=token?["All Profiles",'Best Matches',"My Match","Requests","My Profile"]:["Login","Sign up"]
    let elements=typeAdmin==="true"?["Un Approved Users",'Best Matches',"All Profiles","My Match","Requests","My Profile"]:elements2
    return (
    <nav className="w-full  bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow">
        <div><Toaster reverseOrder={true}/></div>
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between py-5 md:py-5 md:block">
                        <NavLink to="/">
                            <h2 className="text-2xl font-bold text-white">Mojojo</h2>
                        </NavLink>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        viewBox="0 0 20 20"
                                        fill="white"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="white"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-4 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <ul className="items-center justify-center space-y-6 pb-4 md:flex md:space-x-6 md:space-y-0">
                            {
                                elements.map((value,i)=>
                                    <li key={i} className={`text-white font-bold hover:underline `}>
                                <NavLink className={({ isActive}) =>
                                isActive?"font-extrabold underline":""
                                    } to={`/${value}`}>{value}</NavLink></li>
                                )
                            }
                       {token && <li className='text-white font-bold hover:underline cursor-pointer' onClick={onClick}>Logout</li>}
                       </ul>
                    </div>
                </div>
            </div>
        </nav>
  )
}

export default Navbar