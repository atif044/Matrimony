import React,{useEffect,useContext,useState} from 'react'
import context from '../Context/context'
import IndividualProfileName from './IndividualProfileName';
import { useNavigate } from 'react-router-dom';
const AllProfiles = () => {
  const navigate=useNavigate();
  const{allProfiles}=useContext(context);
  const [allProfile,setAllProfiles]=useState([])
  let fetchData= async()=>{
    let res=await allProfiles();
    setAllProfiles(res)
    return res
  }
  useEffect(() => {
    
    fetchData();
  },[])
  return (
    <div>
      {
        allProfile.map((val,i)=>{
          return val.map((ival,ii)=>{
            return <div key={ii} onClick={()=>{
              navigate("/indPrDet",{state:{...ival,fan:false}})
            }}>
              <IndividualProfileName val={ival} name={ival.userId.Name} profilePic={ival.userId.profilePic} description={ival.description}/>
            </div>
          })
        })
      }
       
    </div>
  )
}

export default AllProfiles