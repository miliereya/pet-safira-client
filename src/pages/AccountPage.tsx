import { observer } from "mobx-react-lite"
import { FC, useContext } from "react"
import { Context } from ".."
import Account from "../components/Account"
import LoginForm  from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import { Breadcrumbs } from "../components/UI/Breadcrumbs"
import { PageSpinner } from "../components/UI/Loaders/PageSpinner"
import s from './pages.module.css'

const AccountPage:FC = () => {
    const {store} = useContext(Context)

    if(store.isLoading){
        return <PageSpinner />
    }

    if(!store.isAuth){
        return (
            <>
                <Breadcrumbs />
                <div className={s.AccountPage_container}>
                    <LoginForm />
                    <RegisterForm />
                </div>
            </>
        )
    }
    return (
        <>
            <Breadcrumbs />
            <div className='container'>
                <Account user={store.user} />
            </div>
        </>
    )
}

export default observer(AccountPage)