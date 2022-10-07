import { observer } from 'mobx-react-lite'
import { FC, useContext } from 'react'
import { Context } from '../..'
import { IUser } from '../../models/IUser'
import s from './account.module.css'

interface AccountProps {
    user: IUser
}

const Account:FC<AccountProps> = ({user}) => {
    const {store} = useContext(Context)
    
    return (
        <div className={s.section}>
            <p className={s.desc}>Id: <span>{store.user.id}</span></p>
            <p className={s.desc}>Email: <span>{store.user.email}</span></p>
            <p className={s.desc}>Confirmed email: <span>{store.user.isActivated ? 'Yes' : 'No'}</span></p>
            <button className={s.btn_logout} onClick={() => store.logout()}>Logout</button>
        </div>
    )
}

export default observer(Account)