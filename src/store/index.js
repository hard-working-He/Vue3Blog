import React from "react";
import LoginStore from "./login.Store";
import UserStore from "./userStore";
class RootStore{
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    
  }
}
const StoreContext = React.createContext(new RootStore())
export const useStore=()=>React.useContext(StoreContext)