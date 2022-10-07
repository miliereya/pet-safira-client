import { FC } from 'react'
import s from './spinner.module.css'

interface SpinnerProps {
    width?: string
}

export const Spinner:FC<SpinnerProps> = ({width='30px'}) => {
    return (
        <svg style={{width: width}} className={s.spinner} viewBox="0 0 50 50">
            <circle className={s.path} cx="25" cy="25" r="20" fill="none" strokeWidth="10"></circle>
        </svg>
    )
}