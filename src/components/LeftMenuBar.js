import React from 'react'
import { useStore } from '../store'
import { switchMenuBarShow } from '../store/actions'
import { Outlet, Link } from "react-router-dom";

const LeftMenuBar = () => {
    const [state, dispatch] = useStore()
    const { leftMenuBar } = state

    const classMenu = () => {
        return leftMenuBar ?
            'show left-menu-bar'
            :
            'left-menu-bar'
    }
    const closeMenuBar = () =>{
        dispatch(switchMenuBarShow(false))
    }

    return (
        <div className={classMenu()} >
            <div className='menu-bar-content flex flex-col'>
                <Link onClick={closeMenuBar} className='w-full p-2' to="/">Home</Link>
                <Link onClick={closeMenuBar} className='w-full p-2' to="/profile">Profile</Link>
            </div>
            <div onClick={closeMenuBar} className='lef_menu_wrapper'>

            </div>
            <button className='text-black btn-close' onClick={closeMenuBar}><i className="fa-solid fa-angle-left"></i></button>
        </div>
    )
}

export default LeftMenuBar