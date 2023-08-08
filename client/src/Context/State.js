import context from "./context";
import Cookies from 'js-cookie';
import { useState,useEffect} from "react";
const NoteState = (props) => {
    const[token,setToken]=useState(Cookies.get("Authorization"));
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
  const response=await fetch(`${Lhost}/api/auth/logout`,{
    method:'POST',
    credentials:"include",
    headers:{
      'Content-Type':'application/json',
      'Authorization':token
    }
  });
  const json=await response.json()
  if(json.success){
    setToken(Cookies.get("Authorization"));
  }
  return json
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
        <context.Provider value={{token,loginAcc,signUp,logOut}}>
      {props.children}
    </context.Provider>
  )
}
export default NoteState;