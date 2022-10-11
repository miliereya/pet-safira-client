import { Route, Routes } from 'react-router-dom'
import { BlogPage, MainPage, ProductPage, ShopPage } from './pages'
import Header from './components/Header'
import { CmsPage } from './cms/Cms'
import { Footer } from './components/Footer'
import AccountPage from './pages/AccountPage'
import { useContext, useEffect } from 'react'
import { Context } from '.'
import { observer } from 'mobx-react-lite'
import CartPage from './pages/CartPage'

const App = () => {
    const {store} = useContext(Context)
    useEffect(() => {
        if(localStorage.getItem('token')){
            store.checkAuth()
        }
    },[])

    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<MainPage />} />
                <Route path='/shop' element={<ShopPage/>} />
                <Route path='/shop/:category' element={<ShopPage/>} />
                <Route path='/blog' element={<BlogPage/>} />
                <Route path='/blog/:id' element={<BlogPage />} />
                <Route path='/product/:id' element={<ProductPage />} />
                <Route path='/account' element={<AccountPage />} />
                <Route path='/cart' element={<CartPage />} />
                <Route path='/admin' element={<CmsPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default observer(App)
