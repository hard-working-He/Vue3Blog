import { makeAutoObservable } from "mobx";
import { http,getToken,setToken,clearToken } from "../utils";

class LoginStore{
  token = getToken() || ''
  
  constructor() {
    makeAutoObservable(this)
  }

  login = async ({ mobile, code }) => {
    const res = await http.post(
      '/authorizations', {
        mobile,code
      }
    )
    this.token = res.data.data.token
    console.log(this.token)
    setToken(this.token)
  }
  loginOUt = () => {
    this.token = ''
    clearToken()
  }


}
export default LoginStore