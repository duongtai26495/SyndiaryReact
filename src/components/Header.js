import React from 'react'
import { Link } from "react-router-dom";
import logo from '../images/logo.webp'
import { useStore } from '../store';
import { switchMenuBarShow } from '../store/actions'

const Header = () => {
    const [state, dispatch] = useStore()
    const { leftMenuBar } = state

    const toggleShowMenu = () => {
        dispatch(switchMenuBarShow(!leftMenuBar))
    }

    return (
        <div className='bg-white text-black '>
            <nav className='header_nav_mobile container m-auto w-full lg:w-1/4 xl:w-1/5 flex flex-row p-5  '>
                <div className='w-1/2 text-start'>
                    <Link className='' to="/"><img alt='' src={logo} className='logo-header-mobile' /></Link>
                </div>
                <div className='w-1/2 text-end'>
                    <button onClick={toggleShowMenu}>
                        {leftMenuBar ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-bars m-auto "></i>}
                    </button>
                </div>

               
            </nav>
        </div>

    )
}

export default Header