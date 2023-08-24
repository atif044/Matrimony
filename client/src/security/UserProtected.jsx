import React,{useContext} from 'react'
import context from '../Context/context'
import { Navigate,Outlet } from 'react-router-dom'
const UserProtected = () => {
    const {token}=useContext(context)
  return (
    !token?<Navigate to='/login'/>:
    <Outlet/>
    
  )
}

export default UserProtected