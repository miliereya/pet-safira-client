import { NavLink } from 'react-router-dom'
import { MoreSVG } from '../../../svg'
import s from './btn.module.css'

export const ButtonMore = ({ to = '/', text = 'Show more' }) => {
	return (
		<NavLink to={to} className={s.btn}>
			{text}
			<MoreSVG />
		</NavLink>
	)
}

// TODO: create btn Class for extends
