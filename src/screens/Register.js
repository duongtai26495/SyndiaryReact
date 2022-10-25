import React from 'react'
import { useStore } from "../store";
import { updateLoginState } from '../store/actions';
import { LOCAL_LOGIN_STATE } from '../store/constants';
import MyButton from '../components/MyButton';
import { registerUser } from '../config/api_functions';

const Register = () => {
    const [state, dispatch] = useStore()
    const [isLoading, setLoading] = React.useState(false)

    const [uFName, setUfname] = React.useState('')
    const [uName, setUname] = React.useState('');
    const [uEmail, setUeMail] = React.useState('');
    const [uPw, setUpw] = React.useState('');
    const [errorMsg, setErrorMsg] = React.useState('')

    const RegisterHandle = async () => {
        setLoading(true)
        if (validateForm()) {
            let UserRegister = {
                "email":uEmail,
                "fullname": uFName,
                "username": uName,
                "password": uPw
            }

            const registerResult = await registerUser(UserRegister);
            if (registerResult === 'SUCCESS') {
                localStorage.setItem(LOCAL_LOGIN_STATE,true)
                dispatch(updateLoginState(true))
                
            } else {
                setErrorMsg("Username already in use.")
            }

        }

        setLoading(false)
    }

    const validateForm = () => {
        var check = true
        if (uFName.length < 3) {
            check = false
            setErrorMsg('Name must be at least 3 characters')
        }

        if (uName.length < 3) {
            check = false
            setErrorMsg('Username must be at least 3 characters')
        }

        if (uPw.length < 3) {
            check = false
            setErrorMsg('Password must be at least 3 characters')
        }

        if (uEmail.length < 3) {
            check = false
            setErrorMsg('Email must be at least 3 characters')
        }

        if (uName.length < 3 && uPw.length < 3 && uName.length < 3 && uEmail.length < 3) {
            check = false
            setErrorMsg('These fields must be at least 3 characters')
        }

        if (check) {
            setErrorMsg('')
        }
        return check
    }

    return (
        <>
            <h3 className='text-3xl font-bold'>Join now</h3>
            <div className='pt-5'>
                <input className='w-full rounded-md p-2 bg-slate-200' type={'text'} name='fullname' placeholder='Full name' value={uFName} onChange={(e) => setUfname(e.target.value)} />
                <input className='w-full mt-3 rounded-md p-2 bg-slate-200' type={'email'} name='email' placeholder='Email' value={uEmail} onChange={(e) => setUeMail(e.target.value)} />
                <input className='w-full mt-3 rounded-md p-2 bg-slate-200' type={'text'} name='username' placeholder='Username' value={uName} onChange={(e) => setUname(e.target.value)} />
                <input className='w-full mt-3 rounded-md p-2 bg-slate-200' type={'password'} name='password' placeholder='Password' value={uPw} onChange={(e) => setUpw(e.target.value)} />
                {errorMsg === '' ? "" : <div className='mt-2 text-red-500'>{errorMsg}</div>}
                <MyButton color={' bg-cyan-700 text-white'}  icon={<i className="fa-solid fa-arrow-right"></i>} onClick={RegisterHandle} title={'Go'} isLoading={isLoading} />
            </div>
        </>

    )
}

export default Register