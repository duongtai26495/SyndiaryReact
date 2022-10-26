import React, { useState } from 'react'
import MyButton from '../components/MyButton'
import { logoutFunction } from '../config/functions'
import { useStore } from '../store'
import { updateLoginState } from '../store/actions'
import { ACCESS_TOKEN, EMAIL_LOCAL, FULLNAME_LOCAL, GENDER_LOCAL, LOCAL_LOGIN_STATE, PROFILE_PHOTO_LOCAL, USERNAME_LOCAL } from '../store/constants'

const Profile = () => {
  const [state, dispatch] = useStore()
  const [isLoading, setLoading] = useState(false)

  const userLogout = () => {
    setLoading(true)
    console.log("Logout")
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(LOCAL_LOGIN_STATE)
    localStorage.removeItem(USERNAME_LOCAL)
    localStorage.removeItem(FULLNAME_LOCAL)
    localStorage.removeItem(GENDER_LOCAL)
    localStorage.removeItem(PROFILE_PHOTO_LOCAL)
    localStorage.removeItem(EMAIL_LOCAL)
    let token = localStorage.getItem(ACCESS_TOKEN);
    console.log(token)
    if (token == null) {
      dispatch(updateLoginState(false))
    }

    setLoading(false)
  }

  return (
    <div className='container px-10 m-auto align-items-center'>
      <MyButton color={'bg-pink-500 text-white'} onClick={userLogout} title={'Logout'} isLoading={isLoading} />
    </div>
  )
}

export default Profile