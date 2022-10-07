import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import s from './breadcrumb.module.css'

interface BreadcrumbsProps {
	title?: string
}

export const Breadcrumbs:FC<BreadcrumbsProps> = ({title=''}) => {
	let location = useLocation().pathname.slice(1) // breacrumbs withhout /

	return (
		<div className={s.section}>
			<div className={s.content}>
				<h3 className={s.title}>{title!=='' ? title : location}</h3>
				<div className={s.breacrumbs}>Home</div>
			</div>
		</div>
	)
}
