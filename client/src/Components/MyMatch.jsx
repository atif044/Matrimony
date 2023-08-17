import React,{useState,useContext,useEffect} from 'react'
import context from '../Context/context'
import IndividualProfileName from './IndividualProfileName';
import { useNavigate } from 'react-router-dom';


const MyMatch = () => {
    const [myMatchs, setMyMatch] = useState([])
    const{myMatch}=useContext(context);
    const navigate=useNavigate();
    useEffect(() => {
        let fetchData=async()=>{
            let res=await myMatch();
            setMyMatch(res)
            return res
          }
          fetchData();
    }, [])     
  return (
    <div>
        <div>
      {
        
          myMatchs.map((val,i)=>{
          return val.map((ival,ii)=>{
            return <div key={ii} onClick={()=>{
              navigate("/indPrDet",{state:{...ival,match:true}})
            }}>
              <IndividualProfileName  val={ival} name={ival.userId.Name} profilePic={ival.userId.profilePic} description={ival.description}/>
            </div>
          }) 
        })
      }
       
    </div>
    </div>
  )
}

export default MyMatch