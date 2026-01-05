import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

function SideMenu() {
   const navigate = useNavigate();
  const sidemenu = [
    {
      name: "Dashboard",
      icon: assets.dashboardIcon,
      onHoverIcon: assets.dashboardIconColored,
      link:'/admin/dashboard'
    },
    {
      name: "Add Car",
      icon: assets.addIcon,
      onHoverIcon: assets.addIconColored,
      link:'/admin/add'
    },
    {
      name: "Manage Car",
      icon: assets.carIcon,
      onHoverIcon: assets.carIconColored,
      link:'/admin/edit'
    },
    {
      name: "Manage Booking",
      icon: assets.listIcon,
      onHoverIcon: assets.listIconColored,
      link:'/admin/maintain'
    }
  ]

  return (
    <div className='h-screen w-60 border border-gray-400 flex flex-col items-center'>
      
      {/* Profile */}
      <div className='flex flex-col items-center gap-2 mt-5'>
        <img src={assets.user_profile} className='rounded-[60px] w-20'/>
        <p>Apurb Mishra</p>
      </div>

      {/* Menu */}
      <div className='flex flex-col gap-3 mt-6 w-60'>
        
        {sidemenu.map((val, index) => (
          <div
            role='button'
            tabIndex={0}
            key={index}
            className='group relative flex items-center gap-2 cursor-pointer pl-3 py-1 hover:bg-blue-100
              focus-visible:bg-blue-100
              outline-none
            '

            onKeyDown={(e)=>{
                if(e.key=='ArrowUp' && index>0){
                     e.preventDefault();
                     e.target.parentNode.children[index-1].focus();
                }
                if(e.key=='ArrowDown' && index<sidemenu.length-1){
                     e.preventDefault();
                     e.target.parentNode.children[index+1].focus();
                }
                if(e.key=='Enter' || e.key==" "){
                  e.preventDefault();
                  e.target.click();
                }
            }}
            onClick={()=>{
              navigate(val.link)
            }}
          >
            {/* ICONS STACKED */}
            <div className='relative w-6 h-6'>
              <img
                src={val.icon}
                className='w-5 absolute inset-0 opacity-100 group-hover:opacity-0 transition
                  group-focus-visible:opacity-0
                '
                
              />
              <img
                src={val.onHoverIcon}
                className='w-5 absolute inset-0 opacity-0 group-hover:opacity-100 transition
                 group-focus-visible:opacity-100
                '
              />
            </div>

            {/* NAME */}
            <p className='group-hover:text-blue-600 transition
              group-focus-visible:text-blue-600
            '>{val.name}</p>

            {/* CURVED RIGHT BORDER */}
            <div
              className='absolute right-0 top-0 h-full w-1 bg-blue-500 rounded-l-sm 
              opacity-0 group-hover:opacity-100 transition
              group-focus-visible:opacity-100
              '
            ></div>
          </div>
        ))}

      </div>
    </div>
  )
}

export default SideMenu
