import React, { useState } from 'react'
import { NavList } from '../../data'
import { Link, useLocation } from 'react-router-dom'
import { CgClose, CgMenuLeftAlt } from "react-icons/cg";
const Navbar = () => {
    const { pathname } = useLocation()
    const [mobileMenu, setMobileMenu] = useState(false)
    return <nav className='flex justify-between text-base max-w-7xl w-full mx-auto h-[4rem] z-[999]'>
        <div className='flex items-center'>
            <Link to={'/'}>
                <img src='./assets/nexus_logo.png' alt='Nexus_Official' className='w-20 h-20' />
            </Link>
            <span className='uppercase text-white'>Nexus</span>
        </div>
        <div className='flex items-center relative'>
            <ul className='hidden md:flex items-center gap-12 mr-5'>
                {NavList.map(item => {
                    return (
                        <Link to={item.path} key={item.path} >
                            <li key={item.path} className={`${item.path === pathname ? "text-[#3586ff] underline underline-offset-8" : "text-white"} transition-colors`}>
                                {item.label}
                            </li>
                        </Link>
                    )
                })}
            </ul>

            {mobileMenu && <ul className={`absolute py-14 top-0 right-1 bg-black  bg-opacity-80 w-[14rem] flex flex-col items-center h-[100vh] gap-6 text-lg`}>
                {NavList.map(item => {
                    return (
                        <Link to={item.path} onClick={e => setMobileMenu(false)}>
                            <li key={item.path} className={`${item.path === pathname ? "text-orange underline underline-offset-8" : "text-white"} transition-colors hover:text-orange`}>
                                {item.label}
                            </li>
                        </Link>
                    )
                })}
            </ul>}
            <div className='transition-all duration-300 text-3xl mr-4 p-1 cursor-pointer  md:hidden hover:bg-white/20 rounded-full z-[999] active:scale-0' >{mobileMenu ? <CgClose onClick={e => setMobileMenu(false)} /> : <CgMenuLeftAlt onClick={e => setMobileMenu(true)} />}</div>
        </div>

    </nav>
}

export default Navbar
