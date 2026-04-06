import { Navigate } from "react-router-dom";
import { CheckUserStore } from "../../store/useAuthStore";
import type React from "react";


const ProtectedRoute = ({childern}:{childern : React.ReactNode}) => {

    const {isAuth , loading} = CheckUserStore();

    if(loading) return <div>Loading...</div> ;
     
    if(!isAuth){
        return <Navigate to={"/signin"} replace/>
    }

  return childern ;
}

export default ProtectedRoute
