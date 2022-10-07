import { observer } from "mobx-react-lite"
import { FC, useContext } from "react"
import { NavLink } from "react-router-dom"
import { Context } from ".."
import Cart from "../components/Cart"
import { Breadcrumbs } from "../components/UI/Breadcrumbs"
import { PageSpinner } from "../components/UI/Loaders/PageSpinner"

const CartPage:FC = () => {
    const {store} = useContext(Context)

    if(store.isLoading){
        return <PageSpinner />
    }

    if(!store.isAuth){
        return (
            <div className="container">
                <p style={{margin: '50px 0', fontSize: '18px'}}>You need to sign in / sign up first! 
                <NavLink style={{color: 'var(--color-primary)', textDecoration: 'underline', margin: '0 3px'}} to='/account'>Click here</NavLink>
                </p>
            </div>
        )
    }
    return (
        <>
            <Breadcrumbs />
            <div className='container'>
                <Cart />
            </div>
        </>
    )
}

export default observer(CartPage)