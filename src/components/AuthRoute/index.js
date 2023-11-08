import { Navigate } from "react-router-dom";
import { getToken } from "../../utils";


function AuthRoute ({ children }) {
  const isToken = getToken()
  if (isToken) {
    return <>{children}</>
    
  }
  else {
    return <Navigate to="/login" replace />
  }
}
export {AuthRoute}