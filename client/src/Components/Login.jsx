import React,{useState,useContext} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import context from '../Context/context'
import { useNavigate,NavLink } from 'react-router-dom'
const Login = () => {
  const navigate=useNavigate();
   const {loginAcc}=useContext(context)
    const [credential,setCredential]=useState({Email:"",Password:""})
        const onChange=(e)=>{
        setCredential({...credential,[e.target.name]:e.target.value})
    }
const onSubmit =async(e)=>{
    e.preventDefault();
    try{const data=await loginAcc(credential.Email,credential.Password);
    if(data.error){
      toast.error(data.error)
    }
    else if(data.success){
      localStorage.setItem('sender',data.Details.id);
      if(data?.Details?.isAdmin===true){
        return navigate('/Un Approved Users')
      }
      navigate("/")
    }}
    catch(error){
      toast.error("Server Down")
    }
}
  return (
    <>
      <div><Toaster reverseOrder={true}/></div>
    <section className="py-26 bg-white mb-8">
  <div className="container px-4 mx-auto">
    <div className="max-w-lg mx-auto">
      <div className="text-center mt-8 mb-8">
        
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Login</h2>
          </div>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="block mb-2 font-extrabold" for="">Email</label>
          <input
          name="Email"
          value={credential.Email}
          onChange={onChange}
           className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" type="email" placeholder="email"/>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-extrabold" for="">Password</label>
          <input
          name="Password"
          value={credential.Password}
          onChange={onChange}
           className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" type="password" placeholder="**********"/>
        </div>
                <button
          type='submit'
         className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">Login</button>
        <p className="text-center font-extrabold">Already have an account? <NavLink className="text-red-500 hover:underline" to='/sign up'>Signup</NavLink></p>
      </form>
    </div>
  </div>
</section>
</>
  )
}
export default Login;