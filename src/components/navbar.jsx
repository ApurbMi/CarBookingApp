import React, { useState } from 'react'
import { assets, menuLinks } from '../assets/assets'
import { Link } from 'react-router-dom'
import {motion} from 'motion/react'
import {X} from "lucide-react"
import axios from "axios";
import {toast} from 'react-hot-toast'
import { useUserState } from '../ContextApi/authContext'
import { useNavigate } from 'react-router-dom'

function SignInModal({setGoToSing,toggleShow}) {

const [name,setName] = useState('');
const [email,setEmail] = useState('');
const [password,setPassword] = useState('')
const [err,setErr] = useState('');


async function register(e){
   e.preventDefault();
  if(name.length===0){
    setErr('Name section is empty');
    return;
  }
  else if(email.length===0){
     setErr('Email sectiom is empty');
     return;
  }
  else if(password.length===0){
    setErr('Password section is empty');
    return;
  }
  try{
    const res = await axios.post('http://localhost:5000/user/reg',{
      name,
      email,
      password
    });
   if(res.data.success===true){
      toast.success('User registered successfully');
       setGoToSing(false);
   } 
   else{
     toast.error(res.data.message);
   }

  }
  catch(err){
    console.log(err);
  }

}



  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 backdrop-blur-xs">
      
      <div className="relative p-8 rounded-2xl shadow-xl w-full max-w-md bg-white">
        <X size={24} className='relative bottom-2 left-94' onClick={toggleShow}/>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h2>
        <form className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={(e)=>{
              setName(e.target.value);
            }}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
           <p>{err}</p>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            onChange={(e)=>{
               setEmail(e.target.value);
            }}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
             onClick={(e)=>{
                 register(e);
             }}
>
            Sign Up
          </button>
          <p className='mt-2 text-sm text-red-500 font-sans'>{err}</p>
        </form>
         
        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account? <span className="text-indigo-600 cursor-pointer"
          onClick={()=>{
             setGoToSing(false)
          }}
          >Login</span>
        </p>
      </div>
    </div>
  );
}

function AuthView({toggleShow}){
  
    const [goToSing,setGoToSing] = useState(true);

     if(goToSing){
      return <>
        <SignInModal toggleShow={toggleShow} setGoToSing={setGoToSing}/>
      </>;
     }
     else {
      return <>
        <LoginModal setGoToSing={setGoToSing} toggleShow={toggleShow}/>
      </>
     }
}


function LoginModal({ setGoToSing, toggleShow }) {
   
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const {user,setUser} = useUserState();  
   const navigate = useNavigate();
async function submitLogin(e) {
  e.preventDefault();
    
    try{
       const res = await axios.post('http://localhost:5000/user/login',{
      email,
      password
   });

   if(res.data.success===true){
       toast.success(res.data.message);
       setUser({
         userId:res.data.userData._id,
         userEmail:res.data.userData.email,
         userRole:res.data.userData.role,
         userName:res.data.userData.name,
         userToken:res.data.token
       })
       toggleShow();
       if(res.data.userData.role==='admin'){
           navigate("/admin/dashboard")           
       }   
   }
   else{
      toast.error(res.data.message);
   }

    }
    catch(err){
      toast.error(err.message);
console.log(err.message);
    }
    
}


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-xs z-50">
      <div className="relative p-8 rounded-2xl shadow-2xl w-full max-w-md bg-white animate-fadeIn">
        
        {/* Close Button */}
        <X
          size={24}
          className="absolute top-4 right-4 cursor-pointer text-gray-500 hover:text-gray-800 transition"
          onClick={toggleShow}
        />

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back!
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e)=>{
              setEmail(e.target.value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e)=>{
              setPassword(e.target.value);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
            onClick={(e)=>{
              submitLogin(e);
            }}
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-indigo-600 cursor-pointer font-medium hover:underline"
            onClick={() => setGoToSing(true)}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}





function Navbar() {
  
  const [menu, setMenu] = useState(false);
  const [show,setShow] = useState(false);
  const {user,setUser} = useUserState();
  const navigate = useNavigate();

function toggleShow() {
  setShow(prev => !prev);
}
function handleLogout(){
    setUser(null);
    toast.success('Logout successfull');
   navigate('/');
}

  return (
    <>
      <motion.div
       initial={{y:-10 , opacity:0}}
       animate={{y:0 ,opacity:1}}
       transition={{duration:0.3}}
      className='flex items-center py-4 px-10 lg:px-10 justify-between border-b border-gray-400 bg-[#e9ecef]'>
        {/* logo */}
        <div className='hover:scale-105 transition-transform duration-400 m-2'>
          <img src={assets.logo} />
        </div>
        
        {/* search , list of car , sign up and log out button */}
        <div className='md:flex justify-evenly gap-6 items-center hidden'>
          {menuLinks.map((link, index) => {
            return (
              <Link key={index} to={link.path}>
                {link.name}
              </Link>
            )
          })}
         {/* search */}
          <div className='md:flex border hidden border-gray-400 rounded-2xl items-center justify-between px-2 py-1'>
            <input type="text" className='outline-none px-2' placeholder="Search cars" />
            <img src={assets.search_icon}/>
          </div>
          {/* button */}
          <div className='flex items-center gap-5 md:flex-row flex-col'>
            <Link to="/admin" className='text-sm text-gray-400'>List cars</Link>
            { 
              (user===null)?<>
               <button className='px-5 py-2 bg-blue-500 text-white rounded-sm text-center font-bold'
             onClick={toggleShow}
            >Sign up</button>
              </>:<>
             <button className='px-5 py-2 bg-blue-500 text-white rounded-sm text-center font-bold'
              onClick={handleLogout}
            >LogOut</button>
              </>

            }
          </div>
        </div>

{/* menu icon and close icon */}
        <div className={`md:hidden z-30`} onClick={() => { setMenu(!menu) }}>
          <img src={menu ? assets.close_icon : assets.menu_icon} />
        </div>
      </motion.div>


{/*Column menu*/}
      
      
      <div className={`flex item-start flex-col absolute top-0 left-0 p-5 h-screen gap-5 z-20 duration-500 overflow-hidden bg-white w-screen ${menu ? "translate-x-0" : "-translate-x-full"}`}>
        {menuLinks.map((link, index) => {
          return(
             <Link key={index} to={link.path}>
              {link.name}
            </Link>
          )
        })}

        <div className='flex items-start flex-col gap-5'>
          <Link to="/admin" className='text-sm text-gray-400'>List cars</Link>
           <button className='px-5 py-2 bg-blue-500 text-white rounded-sm text-center font-bold'
          >Sign up</button>
        </div>
      </div>
          
         {show && <AuthView  toggleShow={toggleShow}/>}
    </>
  )
}

export default Navbar