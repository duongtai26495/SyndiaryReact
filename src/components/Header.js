import React from 'react'
import { Link } from "react-router-dom";
import logo from '../images/logo.webp'
import { useStore } from '../store';
import { switchMenuBarShow } from '../store/actions'

const Header = () => {
    const [state, dispatch] = useStore()
    const { leftMenuBar } = state

    const toggleShowMenu = () =>{
        dispatch(switchMenuBarShow(!leftMenuBar))
    }

    return (
        <div className='bg-primary '>
            <nav className='header_nav_mobile container m-auto w-full md:w-1/3 flex flex-row p-5  text-white'>
                <div className='w-1/3 text-start'>
                    <button onClick={toggleShowMenu}>
                        {leftMenuBar ? <i className="fa-solid fa-x"></i> : <i className="fa-solid fa-bars m-auto "></i>}
                        </button>
                </div>
                <div className='w-1/3 text-center'>
                    <Link className='' to="/"><img alt='' src={logo} className='logo-header-mobile' /></Link>
                </div>
                <div className='w-1/3 text-end'>
                    <Link className='m-auto' to="/add"><i className="fa-solid fa-file-circle-plus"></i></Link>
                </div>
            </nav>
        </div>

    )
}

export default Header