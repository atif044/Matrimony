import React,{useState,useContext,useEffect} from 'react'
import context from '../Context/context'
import IndividualProfileName from './IndividualProfileName';
import { useNavigate } from 'react-router-dom';
import {toast, Toaster } from 'react-hot-toast';
import {Puff} from 'react-loader-spinner';
const MyMatch = () => {
  const [loading, setLoading] = useState(true);
    const [myMatchs, setMyMatch] = useState([])
    const{myMatch}=useContext(context);
    const navigate=useNavigate();
    useEffect(() => {
        let fetchData=async()=>{
          try {
            
            let res=await myMatch();
            if(res){
              if(res===undefined||res===null){
                setMyMatch([])
                setLoading(false)
                return;
              }
            if(res.msg!=='No Match Found'){
              setMyMatch(res)
              setLoading(false)
              return 
            }
            setLoading(false)
            setMyMatch([])
            return res
            }
          } catch (error) {
            toast.error("Server Error")            
            setLoading(false)
          }
          }
          fetchData();
    }, [])     
  return (
    <div>
    <Toaster/>
        <div>
      {
        loading?
        <div className='flex justify-center items-center'>
        <Puff
          color="#00BFFF"
          height={100}
          width={100}/>
          </div>
          : myMatchs.length>0 ? myMatchs.map((val,i)=>{
          return val.map((ival,ii)=>{
            return <div key={ii} onClick={()=>{
              navigate("/indPrDet",{state:{...ival,match:true}})
            }}>
              <IndividualProfileName  val={ival} name={ival.userId.Name} profilePic={ival.userId.profilePic} description={ival.description}/>
            </div>
          }) 
        }):
        <div className='flex justify-center items-center mt-5'>
          <h1 className='text-black'> NO MATCH FOUND</h1>
        </div>
        }  
        
       
    </div>
    </div>
  )
}

export default MyMatch