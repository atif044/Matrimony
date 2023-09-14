import React,{useState,useContext} from 'react'
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import toast, { Toaster } from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import context from '../../Context/context';
const Signup = () => {
    const [credential,setCredential]=useState({Name:"",Email:"",Password:"",Gender:"Male"})
     const {token,signUp}=useContext(context)
    const [startDate, setStartDate] = useState("");
    const onChange=(e)=>{
        // console.log(credential)
        setCredential({...credential,[e.target.name]:e.target.value})
    }
  const onSubmit=async(e)=>{
    e.preventDefault();
    try{
    let res=await signUp(credential.Name,credential.Email,credential.Password,credential.Gender,startDate);
    if(res.error){
      toast.error(res.error);
    }
    else if(res.success){
      toast.success("Your Account has been created");
      toast("Admin Approval Needed in order to use your account",{
        duration:3000
      }) 
    }
  }
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
      <div className="text-center mb-8 mt-4">

        <h2 className="text-3xl md:text-4xl font-extrabold mb-2">Sign Up</h2>
          </div>
      <form onSubmit={onSubmit}>
        <div className="mb-6">
          <label className="block mb-2 font-extrabold" htmlFor="">Name</label>
          <input 
          name="Name"
          required
          value={credential.Name}
          onChange={onChange}
          className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" type="text" placeholder="Name"/>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-extrabold" htmlFor="">Email</label>
          <input
          name="Email"
          required
          value={credential.Email}
          onChange={onChange}
           className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" type="email" placeholder="email"/>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-extrabold" htmlFor="">Password</label>
          <input
          required
          name="Password"
          value={credential.Password}
          onChange={onChange}
           className="inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded" type="password" placeholder="**********"/>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-extrabold " htmlFor="">Gender</label>
          <select
          name="Gender"
          value={credential.Gender}
          onChange={onChange}
           className="outline-none inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block mb-2 font-extrabold" htmlFor="">Date of Birth</label>
          <DatePicker className='text-black bg-inherit inline-block w-full p-4 leading-6 text-lg font-extrabold placeholder-indigo-900 bg-white shadow border-2 border-indigo-900 rounded' showIcon value={startDate} onChange={setStartDate}/>
        </div>
        <button
          type='submit'
         className="inline-block w-full py-4 px-6 mb-6 text-center text-lg leading-6 text-white font-extrabold bg-indigo-800 hover:bg-indigo-900 border-3 border-indigo-900 shadow rounded transition duration-200">Sign up</button>
        <p className="text-center font-extrabold">Already have an account? <NavLink className="text-red-500 hover:underline" to='/login'>Login</NavLink></p>
      </form>
    </div>
  </div>
</section>
    </>
  )
}

export default Signup