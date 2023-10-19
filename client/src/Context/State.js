import context from "./context";
import Cookies from 'js-cookie';
import {link} from '../Components/Utils'
import { useState,useEffect} from "react";
const NoteState = (props) => {
    const[token,setToken]=useState(Cookies.get("Authorization"));
    const[typeAdmin,settypeAdmin]=useState(Cookies.get("typeAdmin"));
    const [profile,setProfile]=useState(null);
    useEffect(() => {
  
    }, [token])

  const Lhost = link
   function formatDateToMMDDYYYY(longDate) {
    const date = new Date(longDate);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    
    return `${month}/${day}/${year}`;
  }
 const loginAcc=async (Email,Password)=>
 {      
     const response = await fetch(`${Lhost}/api/auth/login`, {
         method: 'POST',
         credentials:"include",
          headers: {
           'Content-Type': 'application/json',
          },
          body: JSON.stringify({Email,Password})
         },
        );
         const json=await response.json();
         if(json.success){
          setToken(Cookies.get('Authorization'))
          settypeAdmin(Cookies.get('typeAdmin'));
         }
         return json;
 }
const signUp=async(Name,Email,Password,Gender,DateofBirth)=>{
  DateofBirth=formatDateToMMDDYYYY(DateofBirth)
  const response =await fetch(`${Lhost}/api/auth/signup`,
  {
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    body:JSON.stringify({Name,Email,Password,Gender,DateofBirth})
  }
  );
  const json=await response.json();
  return json;
} 
const logOut=async()=>{
  const response=await fetch(`${Lhost}/api/auth/logout`,{
    method:'POST',
    credentials:"include",
    headers:{
      'Content-Type':'application/json',  
    }
  });
  const json=await response.json()
  if(json.success){
    setToken(Cookies.get("Authorization"));
    setProfile(null);
    settypeAdmin(Cookies.get("typeAdmin"));
  }
  return json
}
const myProfile=async()=>{
  const response=await fetch(`${Lhost}/api/auth/MyProfile`,{
    method:"POST",
    credentials:"include",  
  });
  const json=await response.json();
  if(json?.error){
   return json.error 
  }
  setProfile({profile:json});
}
const detailUpdate=async(details)=>{
    let response=await fetch(`${Lhost}/api/auth/profile`,{
      method:"POST",
      credentials:"include",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(details)
    })
    const json=await response.json()
    return json;
}
const photoUpdate=async(files)=>{
  const formData=new FormData();
  files.forEach((image,index) => {
    formData.append('images', image,image.name);
  });
  let response=await fetch(`${Lhost}/api/auth/upload_img`,
  {
    method:"POST",
    credentials:"include",
    headers:{
      // "Content-Type":"multipart/form-data"
    },
    body:formData
  });
  let json=await response.json()
  return json

}


const profilePic=async(file)=>{
  const formData=new FormData();
     formData.append('image', file);
  let response=await fetch(`${Lhost}/api/auth/upload_profile_pic`,
  {
    method:"POST",
    credentials:"include",
    headers:{
    },
    body:formData
  });
  let json=await response.json()
  return json;
}
const allProfiles=async()=>{
  const response=await fetch(`${Lhost}/api/auth/all_profiles`,{
    method:"GET",
    credentials:"include"
  })
  let json =await response.json();
  return json;
}
const expressInterest=async(id)=>{
     let response=await fetch(`${Lhost}/api/auth/express/${id}`,{
      method:"POST",
      credentials:"include"
     })
     const json= await response.json();
     return json;
}
const myAllFans=async()=>{
  let response=await fetch(`${Lhost}/api/auth/my_fans`,
  {
    method:"GET",
    credentials:"include"
  });
  let json=await response.json();
  return json;
}
const confirmMatch=async(id)=>{
  let response=await fetch(`${Lhost}/api/auth/confirm_match/${id}`,{
    method:"PUT",
    credentials:"include"
   })
   const json= await response.json();
   return json;
}
const myMatch=async()=>{
    const response=await fetch(`${Lhost}/api/auth/my_match`,{
      method:"GET",
      credentials:"include"
    })
    const json=await response.json();
    return json;
}

const allunApproved=async()=>{
  const response= await fetch(`${Lhost}/api/auth/admin/all_np`,{
    method:"GET",
    credentials:"include"
  });
  const json = await response.json()
  return json;
}

const approveId=async(id)=>{
  let response=await fetch(`${Lhost}/api/auth/admin/approve/${id}`,{
    method:"POST",
    credentials:"include"
   })
   const json= await response.json();
   return json;
}
const sendMessage=async(sender,receiver,content)=>{
  let response=await fetch(`${Lhost}/api/auth/messaging`,{
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify({sender,receiver,content})
  }
  )
  const json =await response.json()
  return json;
}
const AllMessage=async(sender,receiver)=>{
  const response=await fetch(`${Lhost}/api/auth/allMessages/${sender}/${receiver}`,
  {
    method:"GET"
  })
  let json=await response.json();
  return json;
}


const bestMatches=async()=>{
  const response=await fetch(`${Lhost}/api/auth/best_matches`,{
    method:"GET",
    credentials:"include"
  })
  let json =await response.json();
  return json;
}
  return (
        <context.Provider value={{token,typeAdmin,bestMatches,approveId,myMatch,confirmMatch,myAllFans,expressInterest,photoUpdate,profilePic,loginAcc,signUp,logOut,myProfile,detailUpdate,profile,allProfiles,allunApproved,AllMessage,sendMessage}}>
      {props.children}
    </context.Provider>
  )
}

export default NoteState;