import React,{useContext} from 'react'
import context from '../../Context/context';
import toast, { Toaster } from 'react-hot-toast';
import Utils from '../Utils';
const UsersDispCard = (props) => {
	const{approveId}=useContext(context);
	const approveIt=async(id)=>{
		try {
			
			let res=await approveId(id);
			if(res?.error)
			{
				return toast.error(res.error)
			}
			else if(res?.msg){
				return toast.success(res.msg)
			}
		} catch (error) {
			return toast.error("Server Down")
		}

	}
  return (
    <>
        <div className="p-6 sm:p-12 dark:bg-gray-900 dark:text-gray-100 ml-5 mr-5 mt-5 rounded-xl">
		<Toaster/>
	<div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
		<img src={`${props.profilePic}`} alt="hiughiuh" className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0" />
		<div className='md:flex md:justify-between'>
		<div className="flex flex-col">
			<h4 className="text-lg font-semibold text-center md:text-left">{props.name}</h4> 
			<p className="dark:text-gray-400">{props.description}</p>
			<p className="dark:text-gray-400">{props.dob}</p>
		</div>
		<div>
			<button onClick={()=>{
			approveIt(props.id)
				props.setter([])
			}} className='bg-green-500 p-2 m-12 rounded-2xl hover:border-2 hover:border-transparent hover:bg-green-600'>Approve</button>
		</div>
		</div>
	</div>
</div>
    </>
  )
}

export default UsersDispCard