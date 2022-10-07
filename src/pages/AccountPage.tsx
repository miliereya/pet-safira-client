import { observer } from "mobx-react-lite"
import { FC, useContext } from "react"
import { Context } from ".."
import Account from "../components/Account"
import LoginForm  from "../components/LoginForm"
import RegisterForm from "../components/RegisterForm"
import { Breadcrumbs } from "../components/UI/Breadcrumbs"
import { PageSpinner } from "../components/UI/Loaders/PageSpinner"

const AccountPage:FC = () => {
    const {store} = useContext(Context)

    if(store.isLoading){
        return <PageSpinner />
    }

    if(!store.isAuth){
        return (
            <>
                <Breadcrumbs />
                <div style={{display: 'flex', justifyContent: 'space-between', width: '800px', margin: '0 auto'}}>
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