import context from "./context";
import Cookies from 'js-cookie';
import { useState,useEffect} from "react";
const NoteState = (props) => {
    const[token,setToken]=useState(Cookies.get("Authorization"));
    const [profile,setProfile]=useState(null);
    useEffect(() => {
  
    }, [token])

  const Lhost = "http://localhost:5000" 
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
  console.log(token)
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
  console.log(files)
  const formData=new FormData();
  files.forEach((image,index) => {
    formData.append('images', image,image.name);
  });
  console.log(formData)
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
  console.log(json)
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
  console.log(json)
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
   console.log(json)
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
//  //uSED TO SIGN UP 
//  const signAcc=async (name,username,email,password)=>
//  {
//      const response = await fetch(`${Lhost}/api/auth/createuser`,{
//          method: 'POST',
//           headers: {
//            'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({name,username,email,password})
//          });
//      const json=await response.json();
//      return json;
//  }

//   const getDetails=async()=>
//   {
//     const response = await fetch(`${Lhost}/api/auth/getuser`,{
//       method: 'POST',
//        headers: {
//         'Content-Type': 'application/json',
//         'auth-token': localStorage.getItem('token')
//        },
//       });
//   const json=await response.json();
//   return json;
//   }
  

//   const getUsers=async()=>
//   {
//     const response = await fetch(`${Lhost}/api/auth/getusers`,{
//       method: 'GET',
//        headers: {
//         'Content-Type': 'application/json',
//         'auth-token': localStorage.getItem('token')

//        },
//       });
//   const json=await response.json();
//   return json;
//   }
//   const ChangePwd=async(oldPwd,newPwd)=>
//   {
//     const response = await fetch(`${Lhost}/api/auth/changepwd`,{
//       method: 'POST',
//        headers: {
//         'Content-Type': 'application/json',
//         'auth-token': localStorage.getItem('token')
//        },
//        body: JSON.stringify({oldPwd,newPwd})
//       });
//   const json=await response.json();
//   return json;
//   }
// const changeNiche=async(newNiche)=>
// {
//   const response=await fetch(`${Lhost}/api/auth/changeniche`,
//   {
//     method:'POST',
//     headers:{
//       'Content-Type': 'application/json',
//         'auth-token': localStorage.getItem('token')
//     },
//     body:JSON.stringify({newNiche})
//   });
//   const json=await response.json();
//   return json;
// }
// const changeEmail=async(newEmail)=>
// {
//   const response=await fetch(`${Lhost}/api/auth/changeemail`,
//   {
//     method:'POST',
//     headers:{
//       'Content-Type': 'application/json',
//         'auth-token': localStorage.getItem('token')
//     },
//     body:JSON.stringify({newEmail})
//   });
//   const json=await response.json();
//   return json;
// }
  return (
        <context.Provider value={{token,myMatch,confirmMatch,myAllFans,expressInterest,photoUpdate,profilePic,loginAcc,signUp,logOut,myProfile,detailUpdate,profile,allProfiles}}>
      {props.children}
    </context.Provider>
  )
}
export default NoteState;