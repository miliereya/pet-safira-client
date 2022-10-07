import { FC } from 'react'
import s from './input.module.css'

interface InputProrps {
    title: string
    value: string
    required?: boolean
    type?: string
    onInput: (val:any) => void
}

export const Input: FC<InputProrps> = ({title, value, onInput, required, type="text"}) => {
    return (
        <div className={s.section}>
            <p className={s.title}>{title}<span className={s.span}>{required ? '*' : ''}</span></p>
            <input
                onInput={(e) => onInput(e.target)}
                value={value}
                className={s.input}
                required={required ?? false}
                type={type}
            />
        </div>
    )
}