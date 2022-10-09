import { CartSVG, HeartSVG, MagnifierSVG, SyncSVG } from '../../svg'
import classNames from 'classnames/bind'
import s from './hovermenu.module.css'
import ButtonPopup from '../Buttons/ButtonPopup'
import { FC } from 'react'

let cx = classNames.bind(s)

interface HovermenuProps {
	menuToggle: any
	location: 'right' | 'bottom'
	link_id: string
}

export const Hovermenu: FC<HovermenuProps> = ({ menuToggle, location, link_id }) => {
	let menuCN = cx('menu', { active: menuToggle, large: location })
	
	return (
		<div className={menuCN} style={location==='right' ? {
			top: '60px',
		} : {
			bottom: '-7px',
			width: '100%'
		}}>
			<ButtonPopup to={`/product/${link_id}`} text='Add to Cart'>
				<CartSVG />
			</ButtonPopup>
			<ButtonPopup to={`/product/${link_id}`} text='Quick View'>
				<MagnifierSVG />
			</ButtonPopup>
			<ButtonPopup to={`/product/${link_id}`} text='Add to Wishlist'>
				<HeartSVG />
			</ButtonPopup>
			<ButtonPopup to={`/product/${link_id}`} text='Add to Compare'>
				<SyncSVG />
			</ButtonPopup>
		</div>
	)
}
