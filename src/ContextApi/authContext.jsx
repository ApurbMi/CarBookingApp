import { createContext, useState, useContext, useEffect } from "react";

//create context
//make a provider
//make a custom hook
const AuthContext = createContext(null);


export function AuthStateProvider({children}){
    const [user,setUser] = useState(
        ()=>{
            const savedUser = localStorage.getItem("user");
            return (savedUser)?JSON.parse(savedUser):null
        }
    );

    useEffect(()=>{
         if(user){
            localStorage.setItem("user",JSON.stringify(user));
         } 
         else{
           localStorage.removeItem("user");
         } 
    },[user]);

   
    return (
       <AuthContext.Provider value={{user,setUser}}>
         {children}
       </AuthContext.Provider>

    )

}

export const useUserState = ()=>{
      const context = useContext(AuthContext)
       if (!context) {
    throw new Error("useUserState must be used inside AuthProvider");
  }

      return context;
}