
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Protectedroute = ({children})=>{

 const {user} = useSelector((state)=>state.user);

 const navigate = useNavigate();

      useEffect(()=>{
          if(!user){
            navigate('/login')
        }

        if(user?.user?.role !=='admin'){
            //  navigate('/')
           {children}
        }
      },[])
       
      

    return (
        <>{children}</>
    )
}

export default Protectedroute;