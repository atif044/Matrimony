import React,{useEffect,useContext,useState} from 'react'
import context from '../Context/context'
import IndividualProfileName from './IndividualProfileName';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import {Puff} from 'react-loader-spinner';

const MyFans = () => {
  const navigate=useNavigate();
  const [myFans,setMyFans]=useState([])
  const [loading, setLoading] = useState(true);
  const{myAllFans}=useContext(context);
  useEffect(() => {
    let fetchData=async()=>{
      try{
        
        let res=await myAllFans();
        if(res[0].length>0){
          setMyFans(res)
        }
        setLoading(false)
        return res
      }
      catch(error){
        return toast.error("Server Error")
      }
    }
    fetchData();
  },[])
  return (
    <div>
    <Toaster/>
      {
        loading?
        <div className='flex justify-center items-center'>
        <Puff
          color="#00BFFF"
          height={100}
          width={100}/>
          </div>
          :
        myFans.length>0?myFans.map((val,i)=>{
          return val.map((ival,ii)=>{
            return <div key={ii} onClick={()=>{
              navigate("/indPrDet",{state:{...ival,fan:true}})
            }}>
              <IndividualProfileName  val={ival} name={ival.userId.Name} profilePic={ival.userId.profilePic} description={ival.description}/>
            </div>
          })
        }):
        <div className='flex justify-center items-center mt-5'>
          <h1 className='text-black'> NO One Stalked You Today</h1>
        </div>
      }
       
    </div>
  )
}

export default MyFans