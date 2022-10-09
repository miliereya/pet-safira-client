import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import phone from '../../assets/images/phone.png'
import { ButtonPrimary } from '../UI/Buttons/ButtonPrimary'
import { Burger } from './Burger'
import s from './navbar.module.css'

export const Navbar = () => {
	const [sticky, setSticky] = useState<boolean>(false)

	const fixNavbarToTop = () => {
		if (window.scrollY >= 150) {
			setSticky(true)
		} else {
			setSticky(false)
		}
	}

	useEffect(() => {
		window.addEventListener('scroll', fixNavbarToTop)

		return function cleanup() {
			window.removeEventListener('scroll', fixNavbarToTop)
		}
	}, [])

	return (
		<div className={`${s.navbar} ${sticky ? `${s.sticky}` : ''} `}>
			<div className='container'>
				<div className={s.bottom}>
					<div className={s.burger_wrapper}>
						<Burger />
					</div>
						<ButtonPrimary
							text="@miliereya"
							margin="0 45px 0 20px"
							padding="5px 27px"
							fontSize="18px"
							borderRadius="20px 20px 0 0"
							onClick={function () {
								window.location.href = 'https://github.com/miliereya'
							}}
							className={s.btn}
						/>
					<nav className={s.nav}>
						<NavLink className={s.nav__link} to='/'>
							Home
						</NavLink>
						<NavLink className={s.nav__link} to='/shop'>
							Shop
						</NavLink>
						<NavLink className={s.nav__link} to='/blog'>
							Blog
						</NavLink>
						<NavLink className={s.nav__link} to='/admin'>
							Admin
						</NavLink>
					</nav>
					<div className={s.support}>
						<img src={phone} alt='Phone support icon' />
						<div className={s.support__block}>
							<a className={s.support__link} href='tel:792134777999'>
								(921) 34 777 999
							</a>
							<span className={s.support__text}>Customer support</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}