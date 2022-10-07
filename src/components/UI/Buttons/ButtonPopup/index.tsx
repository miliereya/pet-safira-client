import { FC, ReactChild } from 'react'
import { NavLink } from 'react-router-dom'
import s from './buttonPopup.module.css'

interface ButtonPopupProps {
    to: string
    text: string
    children: ReactChild
}

const ButtonPopup: FC<ButtonPopupProps> = ({ to = '/', text = 'Add to Cart', children }) => {
	return (
		<div className={s.wrapper}>
			<NavLink to={to} className={s.btn}>
				{children}
			</NavLink>
			<span className={s.popup}>{text}</span>
		</div>
	)
}

export default ButtonPopup