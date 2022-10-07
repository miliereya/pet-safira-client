import { FC } from 'react'
import { ArrowSVG } from '../../svg'
import s from './arrow.module.css'

interface ArrowProps {
	width: string
	height: string
}

export const Arrow: FC<ArrowProps> = ({width, height}) => {
	return (
		<button className={s.arrow}>
			<ArrowSVG width={width} height={height} />
		</button>
	)
}
