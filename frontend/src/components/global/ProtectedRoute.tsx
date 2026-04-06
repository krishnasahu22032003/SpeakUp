import { Navigate } from "react-router-dom";
import { CheckUserStore } from "../../store/useAuthStore";


const ProtectedRoute = ({childern}:{childern : JSX.element}) => {

    const {isAuth , loading} = CheckUserStore();

    if(loading) return <div>Loading...</div> ;
     
    if(!isAuth){
        return <Navigate to={"/signin"} replace/>
    }

  return childern ;
}

export default ProtectedRoute
