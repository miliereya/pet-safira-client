import { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Context } from '../..'
import s from './registerForm.module.css'
import { observer } from 'mobx-react-lite'

const RegisterForm = () => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [secPassword, setSecPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const { store } = useContext(Context)

    const registerHandler = () => {
        const email_regex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
        if (!email_regex.test(email)){
            return setError('Invalid Email')
        }
        if(password!==secPassword) {
            return setError('Passwords are different')
        }
        if(password.length < 6 || password.length > 24){
            return setError('Passwords length should be more than 6 and less than 24')
        }
        store.registration(email, password)
        setError(store.regError)
    }

    return (
        <div className={s.section}>
            <p className={s.heading}>Sign up</p>
            <p className={s.error}>{error}</p>
            <input
                className={s.input}
                onChange={e => setEmail(e.target.value)}
                value={email}
                type="text" 
                placeholder='Email'
            />
            <input
                className={s.input}
                onChange={e => setPassword(e.target.value)}
                value={password}
                type="password" 
                placeholder='Password'
            />
            <input
                className={s.input}
                onChange={e => setSecPassword(e.target.value)}
                value={secPassword}
                type="password" 
                placeholder='Password again'
            />
            <button
                className={s.btn}
                onClick={() => registerHandler()}
            >
                Go!
            </button>
        </div>
    )
}

export default observer(RegisterForm)