import React from 'react'
import { getUserInfoLogin, updateUserInforAPI } from '../config/api_functions'
import { useStore } from '../store'
import { updateUserInfo as updateState, updateLoginState} from '../store/actions'
import { ACCESS_TOKEN, EMAIL_LOCAL, FULLNAME_LOCAL, GENDER_LOCAL, PROFILE_PHOTO_LOCAL, USERNAME_LOCAL } from '../store/constants'
import MyButton from './MyButton'

const FormUpdate = () => {

    const [state, dispatch] = useStore()
    const { updateUserInfo, userLoginState } = state
    const [fullName, setFullname] = React.useState(localStorage.getItem(FULLNAME_LOCAL))
    const [gender, setGender] = React.useState(localStorage.getItem(GENDER_LOCAL))

    const saveUpdate = async () => {
        var user = {
            "full_name":fullName,
            "gender":gender
        }

        const result = await updateUserInforAPI(user)
        if(result === 'SUCCESS'){
            getUserInfoLogin()
            setUpdateInfo()
        }
    }

    const setUpdateInfo = () => {
        dispatch(updateLoginState(!userLoginState))
    }

  return (
    <div className='w-full p-2 flex flex-col'>
    <h3>Update information</h3>
    <div className='w-full flex flex-col'>
        <input 
        type={'text'} 
        className='w-full p-2' 
        placeholder='Full name' 
        value={fullName} 
        name='fullname'
        onChange={(e)=>setFullname(e.target.value)} 
        />


        <select className='w-full' value={gender} onChange={(e)=>setGender(e.target.value)} >
            <option value={1}>Male</option>
            <option value={2}>Female</option>
            <option value={3}>Unknown</option>
        </select>
    </div>
    <div className='w-full flex flex-row'>
        <MyButton title={"Save"} color={'bg-cyan-700 text-white'} onClick={() => saveUpdate()} />
        <MyButton title={"Cancel"} color={'bg-orange-500 text-white'} onClick={() => setUpdateInfo()} />
    </div>

</div>
  )
}

export default FormUpdate