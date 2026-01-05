import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../components/SideMenu'
import Footer from '../components/footer'
import Navbar from '../components/navbar'

function Main() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Navbar />

      <div className="flex flex-1 w-full">
        {/* Sidebar */}
        <div className="shrink-0">
          <SideMenu />
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
      </div>

      <Footer />
    </div>
  );
}


export default Main