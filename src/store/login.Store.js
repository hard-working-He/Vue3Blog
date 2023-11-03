import { makeAutoObservable } from "mobx";
import { http } from "../utils";

class LoginStore{
  token = ''
  constructor() {
    makeAutoObservable(this)
  }

  login = async ({ mobile, code }) => {
    const res = await http.post(
      '/authorizations', {
        mobile,code
      }
    )
    this.token = res.data.token
    console.log(res)
  }


}
export default LoginStore