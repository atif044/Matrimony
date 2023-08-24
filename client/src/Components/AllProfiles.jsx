import React,{useEffect,useContext,useState} from 'react'
import context from '../Context/context'
import IndividualProfileName from './IndividualProfileName';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {Puff} from 'react-loader-spinner';

const AllProfiles = () => {
  const navigate=useNavigate();
  const{allProfiles}=useContext(context);
  const [loading, setLoading] = useState(true);

  const [allProfile,setAllProfiles]=useState([]);
  let fetchData= async()=>{
    try {
      let res=await allProfiles();
      if(res.error!=="Please Complete Your Profile First")
      {
        setLoading(false)
        setAllProfiles(res)
      }
      setLoading(false)
    } catch (error) {
      return toast.error("Server Down")
    }
  }
  useEffect(() => {
    
    fetchData();
  },[])
  return (
    <div>
      {loading?
        <div className='flex justify-center items-center'>
        <Puff
          color="#00BFFF"
          height={100}
          width={100}/>
          </div>
          :
        allProfile.length>0?allProfile.map((val,i)=>{
          return val.map((ival,ii)=>{
            return <div key={ii} onClick={()=>{
              navigate("/indPrDet",{state:{...ival,fan:false}})
            }}>
              <IndividualProfileName val={ival} name={ival.userId.Name} profilePic={ival.userId.profilePic} description={ival.description}/>
            </div>
          })
        }):
        <div className='flex justify-center items-center mt-5'>
          <h1 className='text-black'> Please Complete Your Profile First</h1>
        </div>
      }
       
    </div>
  )
}

export default AllProfiles