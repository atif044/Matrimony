import React,{useContext} from 'react'
import context from '../Context/context'
import { Navigate,Outlet } from 'react-router-dom'
import NotAllowed from '../Components/NotAllowed'
const UserProtected = () => {
    const {typeAdmin,token}=useContext(context)
  return (
    typeAdmin==="true"&&token?
    <Outlet/>:!token?<Navigate to='/login'/>:<NotAllowed/>
    
  )
}

export default UserProtected