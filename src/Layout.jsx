import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { useUserState } from './ContextApi/authContext'

function Layout() {
 const {user,setUser} = useUserState();
 const navigate = useNavigate();
 
 useEffect(()=>{
    if(user?.userRole==='admin'){
      navigate('/admin/dashboard');
    }
 },[])


  return (
    <>
      <Navbar/> 
        <Outlet/>
      <Footer/>  
    </>
  )
}

export default Layout