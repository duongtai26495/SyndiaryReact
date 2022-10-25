import React, { useState } from 'react'
import MyButton from '../components/MyButton';
import { loginWithUsernamePassword } from '../config/api_functions';
import { useStore } from '../store';
import { updateLoginState } from '../store/actions';
import {  LOCAL_LOGIN_STATE } from '../store/constants';
const Login = () => {
    const [state, dispatch] = useStore()
    const [isLoading, setLoading] = useState(false)

    const [uName, setUname] = React.useState('');
    const [uPw, setUpw] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('')
    
    const LoginHandle = async () => {
        setLoading(true)
        if(validateForm()){
            var UserLogin = {
                "username":uName,
                "password":uPw
            }
    
           const loginResult = await loginWithUsernamePassword(UserLogin)
           if(loginResult != null){
                setLoading(false)
                localStorage.setItem(LOCAL_LOGIN_STATE, true)
                dispatch(updateLoginState(true))
                
           }else{
            setLoading(false)
            setErrorMsg("Username or password is not correct")
           }
        }
        setLoading(false)
    }

    const validateForm = () =>{
        var check = true
        if(uName.length < 3){
            check = false
            setErrorMsg('Username must be at least 3 characters')
        }

        if(uPw.length < 3){
            check = false
            setErrorMsg('Password must be at least 3 characters')
        }

        if(uName.length <3 && uPw.length < 3){
            check = false
            setErrorMsg('Username and password must be at least 3 characters')
        }

        if(check){
            setErrorMsg('')
        }
        return check
    }

    return (
        <div className='flex flex-col'>
            <h3 className='text-3xl font-bold'>Welcome back</h3>
            <input className='w-full mt-3 rounded-md p-2 bg-slate-200' type={'text'} name='username' placeholder='Username' value={uName} onChange={(e) => setUname(e.target.value)} />
            <input className='w-full mt-3 rounded-md p-2 bg-slate-200' type={'password'}  name='password' placeholder='Password' value={uPw} onChange={(e) => setUpw(e.target.value)} />
            {errorMsg === '' ? "" : <span className='p-2 text-red-500'>{errorMsg}</span>}
            <MyButton color={' bg-cyan-700 text-white'} icon={<i className="fa-solid fa-arrow-right"></i>} onClick={LoginHandle} isLoading={isLoading} title={'Login'} />
        </div>


    )
}

export default Login