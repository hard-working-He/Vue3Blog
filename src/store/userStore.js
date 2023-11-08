import { makeAutoObservable } from "mobx";
import { http } from "../utils";

class UserStore{
  userInfo = {}
  constructor() {
    makeAutoObservable(this)

  }
  async getUserInfo () {
    const res = await http.get('/user/profile')
    //console.log(11)
    console.log(res)
    this.userInfo=res.data.data
    //console.log(22)
  }
}
export default UserStore
