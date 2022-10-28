import React, { useState } from 'react'
import InformationTab from '../components/InformationTab'
import MyButton from '../components/MyButton'
import { logout } from '../config/api_functions'
import { logoutFunction } from '../config/functions'
import { useStore } from '../store'
import { updateLoginState } from '../store/actions'
import { ACCESS_TOKEN, PROFILE_PHOTO_LOCAL } from '../store/constants'

const Profile = () => {
  const [state, dispatch] = useStore()
  const [isLoading, setLoading] = useState(false)
  

  const userLogout = () => {
    setLoading(true)
    logout()
    let token = localStorage.getItem(ACCESS_TOKEN);
    console.log(token)
    if (token == null) {
      dispatch(updateLoginState(false))
    }

    setLoading(false)
  }

  return (
    <div className='container px-10 m-auto align-items-center'>
      <InformationTab />
      <MyButton color={'bg-pink-500 text-white'} onClick={userLogout} title={'Logout'} isLoading={isLoading} />
    </div>
  )
}

export default Profile