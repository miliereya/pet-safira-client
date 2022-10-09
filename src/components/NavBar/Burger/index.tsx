import { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import s from './burger.module.css'

export const Burger = () => {
    const [categories, setCategories] = useState([])
    const [popupToggle, setPopupToggle] = useState(false)
    const ref = useRef<any>(null)

    useEffect(() => {
        document.addEventListener('keydown', escKeyHandler)
        document.addEventListener('click', clickOutsideHandler)

        return () => {
            document.removeEventListener('keydown', escKeyHandler)
            document.removeEventListener('click', clickOutsideHandler)
        }
    }, [])

    const escKeyHandler = (e: any) => {
        if (e.key === 'Escape') {
            setPopupToggle(false)
        }
    }

    const toggleHandler = (e: any) => {
        setPopupToggle(!popupToggle)
    }

    const clickOutsideHandler = (e: any) => {
        if (ref.current && !ref.current.contains(e.target)) {
            setPopupToggle(false)
        }
    }

    return (
        <div className={s.nav} onClick={(e) => toggleHandler(e)} ref={ref}>
            <div className={s.burger}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav className={`${s.popup} ${popupToggle ? `${s.active}` : ''} `}>
                <NavLink className={s.link} to='/account'>
                    Account
                </NavLink>
                <NavLink className={s.link} to='/'>
                    Home
                </NavLink>
                <NavLink className={s.link} to='/shop'>
                    Shop
                </NavLink>

                <NavLink className={s.link} to='/blog'>
                    Blog
                </NavLink>
                <NavLink className={s.link} to='/admin'>
                    Admin
                </NavLink>
            </nav>
        </div>
    )
}