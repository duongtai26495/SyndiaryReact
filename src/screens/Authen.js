import React from 'react'
import { Login, Register } from './index'
import logo from '../images/logo.webp'
function Authen() {
    const [authenMode, setAuthenMode] = React.useState(true);

    const SwitchAuthen = () => setAuthenMode(!authenMode)
    return (
        <div className='authen-form pt-20 form m-auto w-full md:w-1/3'>
            <img alt='' src={logo} className='img-logo-authen' />
            {authenMode ?
                <Login />
                :
                <Register />

            }
            <button className='btn w-full rounded-md  p-2 text-black' onClick={SwitchAuthen}>{authenMode ? "Join now" : "Login"}</button>
        </div>

    )
}

export default Authen