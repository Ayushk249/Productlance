// for logged in users
import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

const AdminRoute = () => {

    const {userInfo} = useSelector((state) => state.auth)

  return (
    userInfo && userInfo.isAdmin ? <Outlet/> : <Navigate to='/login' replace></Navigate>
  )
}

export default AdminRoute