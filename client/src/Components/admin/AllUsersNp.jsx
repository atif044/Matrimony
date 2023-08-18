import React,{useEffect,useContext,useState} from 'react'
import context from '../../Context/context';
import { useNavigate } from 'react-router-dom';
import UsersDispCard from './UsersDispCard';
const AllUsersNp = () => {
  const navigate=useNavigate();
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
    let res=await allunApproved();
    if(allProfile!==res){
        setAllProfiles(res)
    }
    return res
  }
  useEffect(() => {
    fetchData();

  },[allProfile])
  return (
    <div>
      {
        allProfile.map((val,i)=>{
                  return <div key={i} >
              <UsersDispCard name={val.Name} setter={setAllProfiles} profilePic={val.profilePic} description={val.Gender} dob={dateConverter(val.DateofBirth)} id={val._id}/>
            </div>
        })
      }
       
    </div>
  )
}

export default AllUsersNp;