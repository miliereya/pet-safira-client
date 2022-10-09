import { NavLink } from 'react-router-dom'
import { TwitterSVG, GooglePlusSVG, YoutubeSVG, FacebookSVG, InstagramSVG, CartSVG } from '../svg'
import logo from '../../assets/images/logo.png'
import s from './header.module.css'
import { FC, useContext, useEffect, useState } from 'react'
import { Navbar } from '../NavBar'
import { Idata, MetaPopup } from '../UI/MetaPopup'
import { currencies } from '../../Utils/currency'
import { Context } from '../..'
import { observer } from 'mobx-react-lite'

const languages = [
	{ id: 1, text: 'English' },
]

const account = {
	wishlist: 6,
	cart: 4,
}

const curData: Idata[] = []
const values = Object.values(currencies)

values.forEach(value => {
	curData.push({
		text: 'Use ' + value.cur
	})
})

const currencyHandler = (cur?: string) => {
	localStorage.setItem('currency', cur?.slice(cur.length - 1) ?? "$")
	window.location.reload()
}


const Header: FC = () => {
	const [sticky, setSticky] = useState(false)

	const { store } = useContext(Context)

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
		<div className={`${s.navbar} ${sticky ? `${s.padding}` : ''} `}>
			<span className={s.navbar__border}></span>
			<div className={s.top}>
				<div className='container'>
					<div className={s.navbar__top}>
						<div className={s.meta}>
							<MetaPopup text='Language' data={languages} />
							<span className={s.meta__divider}>|</span>
							<MetaPopup onClick={currencyHandler} text='Currency' data={curData} />
						</div>
						<div className={s.social}>
							<a className={s.social__link} href='/' target='_blank' rel='noopener noreferrer'>
								<TwitterSVG />
							</a>
							<a className={s.social__link} href='/' target='_blank' rel='noopener noreferrer'>
								<GooglePlusSVG />
							</a>
							<a className={s.social__link} href='/' target='_blank' rel='noopener noreferrer'>
								<YoutubeSVG />
							</a>
							<a className={s.social__link} href='/' target='_blank' rel='noopener noreferrer'>
								<FacebookSVG />
							</a>
							<a className={s.social__link} href='/' target='_blank' rel='noopener noreferrer'>
								<InstagramSVG />
							</a>
						</div>
					</div>
				</div>
			</div>
			<div className={s.navbar__center}>
				<div className='container'>
					<div className={s.center}>
						<NavLink to='/'>
							<img src={logo} alt='' />
						</NavLink>

						{store.isLoading === false && <div className={s.account}>
							<div className={s.auth}>
								{store.isAuth ? <NavLink className={s.auth_description} to='/account'>
									Account: <span className={s.email}>{store.user.email}</span>
									<button className={s.btn_logout} onClick={() => store.logout()}>Logout</button>
								</NavLink> :

									<div>
										<NavLink to='/account' className={s.auth__link}>
											Register
										</NavLink>
										<span className={s.auth__divider}>/</span>
										<NavLink to='/account' className={s.auth__link}>
											Login
										</NavLink>
									</div>}
							</div>
							<NavLink to='/cart' className={s.account__link}>
								<CartSVG width={30} height={30} />
								{store.user.cart && <span className={s.count}>{store.user.cart.length}</span>}
							</NavLink>
						</div>}
					</div>
				</div>
			</div>
			<Navbar />
		</div>
	)
}

export default observer(Header)

// TODO: add login & register logic
// TODO: add search logic
// TODO: add language & currency logic
// TODO: add wishlist & cart logic
// TODO: add real social accounts
