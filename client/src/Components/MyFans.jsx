import React,{useEffect,useContext,useState} from 'react'
import context from '../Context/context'
import IndividualProfileName from './IndividualProfileName';
import { useNavigate } from 'react-router-dom';
const MyFans = () => {
  const navigate=useNavigate();
  const [myFans,setMyFans]=useState([])
  const{myAllFans}=useContext(context);
  useEffect(() => {
    let fetchData=async()=>{
      let res=await myAllFans();
      setMyFans(res)
      return res
    }
    fetchData();
  },[])
  return (
    <div>
      {
        myFans.map((val,i)=>{
          return val.map((ival,ii)=>{
            return <div key={ii} onClick={()=>{
              navigate("/indPrDet",{state:{...ival,fan:true}})
            }}>
              <IndividualProfileName  val={ival} name={ival.userId.Name} profilePic={ival.userId.profilePic} description={ival.description}/>
            </div>
          })
        })
      }
       
    </div>
  )
}

export default MyFans