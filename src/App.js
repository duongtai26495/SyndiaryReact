import React, { useEffect } from 'react'
import { Authen} from './screens'
import { useStore } from './store'
import { Outlet} from "react-router-dom";
import { ACCESS_TOKEN} from './store/constants';
import Header from './components/Header';
import LeftMenuBar from './components/LeftMenuBar';
import { getUserInfoLogin, pingServer } from './config/api_functions'
const App = () => {
  const [state, dispatch] = useStore()
  const { userLoginState, updateUserInfo } = state

  useEffect(() => {
    DisplayComponent()
    wakeUpServer()
    getInfo()
  }, [userLoginState, updateUserInfo])

  
  const wakeUpServer = async () =>{
    await pingServer()
  }
  const getInfo = async () => {
    await getUserInfoLogin()
}
  const DisplayComponent = () => {
    if (localStorage.getItem(ACCESS_TOKEN) != null) {
      return (
        <div className='container-fluid'>
          <Header />
          <div className='w-full md:w-1/4 m-auto'>
            <Outlet />
          </div>
        </div>
      )
    } else {
      return (
        <Authen />
      )
    }
  }

  return (
    <div>
      <LeftMenuBar />
      <DisplayComponent />
    </div>
  )
}

export default App