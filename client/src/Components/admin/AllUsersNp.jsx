import React,{useEffect,useContext,useState} from 'react'
import context from '../../Context/context';
import { useNavigate } from 'react-router-dom';
import UsersDispCard from './UsersDispCard';
import { toast,Toaster } from 'react-hot-toast';
import {Puff} from 'react-loader-spinner';
const AllUsersNp = () => {
  const navigate=useNavigate();
  const [loading, setLoading] = useState(true);
  const{allunApproved}=useContext(context);
  const [allProfile,setAllProfiles]=useState([])
  const dateConverter=(d)=>{
    let newDate=new Date(d);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
      ];
      return `${newDate.getDate()} ${months[newDate.getMonth()]}, ${newDate.getFullYear()}`
  }
  let fetchData= async()=>{
    try { 
      let res=await allunApproved();
      console.log(res)
      if(res.msg==="No User Found"){
        setAllProfiles([])
        setLoading(false);
        return
      }
      if(allProfile!==res){
        setAllProfiles(res)
      }
      setLoading(false)
      return res
    } catch (error) {
      setLoading(false)
      toast.error("Server Down")
    }
  }
  useEffect(() => {
    fetchData();
  },[])
  return (
    <div>
    <Toaster/>
      {
        loading?<div className='flex justify-center items-center'>
        <Puff
          color="#00BFFF"
          height={100}
          width={100}/>
          </div>
          :
        allProfile.length>0 ?allProfile.map((val,i)=>{
                  return <div key={i} onClick={()=>{
                    navigate('/toApprove',{state:val})
                  }} >
              <UsersDispCard name={val.userId.Name} setter={setAllProfiles} profilePic={val.userId.profilePic} description={val.Gender} dob={dateConverter(val.userId.DateofBirth)} id={val.userId.id}/>
            </div>
        }):
        <div className='flex justify-center items-center mt-5'>
          <h1 className='text-black'> No User to Approve</h1>
        </div>
      }
       
    </div>
  )
}

export default AllUsersNp;