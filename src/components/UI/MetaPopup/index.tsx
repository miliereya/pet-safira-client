import { ArrowSVG } from '../../svg'
import s from './metapopup.module.css'
import { FC } from 'react'

export interface Idata {
	text: string
}

interface MetaPopupProps {
	text: string
	data: Idata[]
	onClick?: (cur?:string) => any
}

export const MetaPopup: FC<MetaPopupProps> = ({

	text = 'Meta text', 
	data = [],
	onClick = () => {
		
	}

}) => {

	return (
		<div className={s.list}>
			{text} <ArrowSVG rotate={90} width={14} height={14} />
			<div className={s.popup}>
				{data.map((item, index) => (
					<button 
						key={index}
						className={s.item}
						onClick = {() => onClick(item.text)}
					>
						{item.text}
					</button>
				))}
			</div>
		</div>
	)
}
