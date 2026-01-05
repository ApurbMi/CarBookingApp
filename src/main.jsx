import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'   
import App from './App.jsx'
import './index.css'
import {MotionConfig} from 'motion/react'
import { AuthStateProvider } from './ContextApi/authContext.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
      <MotionConfig viewport={{once:true}}>
        <AuthStateProvider>
      <App/>
        </AuthStateProvider>
      </MotionConfig>
    </StrictMode>

)
