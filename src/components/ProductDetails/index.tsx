import { FC, useContext, useState } from 'react'
import { FullSizeImg, TProductImgSize } from '../UI/FullSizeImg'
import s from './productDetails.module.css'
import stars from '../../assets/images/stars.png'
import { ratingCounter } from '../../Utils/ratingCounter'
import { setCurrency } from '../../Utils/currency'
import { Divider } from '../UI/Divider'
import { ButtonPrimary } from '../UI/Buttons/ButtonPrimary'
import { FullWidthSlider } from '../UI/Sliders/FullWidthSlider'
import CartService from '../../services/CartService'
import { observer } from 'mobx-react-lite'
import { Context } from '../..'
import { NavLink } from 'react-router-dom'
import { checkItemInCart } from '../../Utils/cart'
import { ICart } from '../../models/ICart'
import { IProduct } from '../../models/IProduct'
import { Cart } from '../svg/Cart'

interface ProductDetailsProps {
    product: IProduct
}

const ProductDetails: FC<ProductDetailsProps> = (product) => {
    const [input, setInput] = useState<string | number>('1')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isAnimation, setIsAnimation] = useState<boolean>(false)
    const { store } = useContext(Context)

    let { _id, name, img, rating, price, oldprice, category, company, description, quantity } = product.product

    const Cprice = setCurrency(price)
    const Coldprice = setCurrency(oldprice)

    const inputHandler = (value: string) => {
        let val = value.replace(/e/, '')
        let inCart = 0
        store.user.cart.map((i: ICart) => {
            if (i.id === _id) {
                inCart = parseInt(i.quantity)
            }
        })

        if (parseInt(val + inCart) >= quantity) {
            setInput(quantity - inCart)
        } else if (parseInt(val) < 1) {
            setInput(1)
        } else {
            setInput(val)
        }
    }

    const AddProductHandler = async () => {
        setIsLoading(true)
        setIsAnimation(true)
        setTimeout(() => setIsAnimation(false), 700)
        try {
            const response = await CartService.AddCartItem(store.user.id, {
                id: _id,
                name: name,
                img: img,
                quantity: input.toString(),
                price: price.toString()
            })
            store.setCart(response.data)

        } catch (e) {
            console.log(e)
        } finally {
            setIsLoading(false)
        }
    }

    const DeleteProductHandler = async () => {
        try {
            const response = await CartService.DeleteCartItem(store.user.id, {
                id: _id,
                name: name,
                img: img,
                quantity: input.toString(),
                price: price.toString()
            })
            store.setCart(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    let size: TProductImgSize = 600
    const wMedia = window.innerWidth
    
    if(wMedia < 1060) {
        size = 425
    }
    if(wMedia < 886) {
        size = 326
    }

    return (
        <div className={s.section}>
            <div className={s.wrapper}>
                <FullSizeImg
                    slug={img}
                    alt={name}
                    size={size}
                    fullsize={wMedia <= 768}
                />
                <div className={s.desc_column} style={quantity === 0 ? { opacity: 0.7 } : {}}>
                    <h3 className={s.name}>{name}</h3>
                    <div className={s.rating_container}>
                        <div className={s.rating} style={{ width: ratingCounter(rating) }}></div>
                        <img src={stars} className={s.img_stars} alt='rating' />
                        <p className={s.remark}>(customer review)</p>
                    </div>
                    {Coldprice !== '' ?
                        <p className={s.price}>{Cprice}<span className={s.old_price}>{Coldprice}</span></p> :
                        <p className={s.price} style={{ color: 'var(--color-dark)' }}>{Cprice}</p>
                    }
                    <div className={s.info_wrapper}>
                        <div>
                            <p className={s.index}>Category</p>
                            <p className={s.index}>Company</p>
                            <p className={s.index}>Quantity</p>
                        </div>
                        <div className={s.col}>
                        <NavLink to={`/shop/${category}`}><p className={s.index_span}>{category}</p></NavLink>
                            <p className={s.index_span}>{`"${company}"`}</p>
                            <p className={s.index_span}>{quantity}</p>
                        </div>
                    </div>

                    <p className={s.description}>{description}</p>
                    <Divider margin='30px 0 0' height='2px' />
                    {store.isLoading === false ? quantity !== 0 ? checkItemInCart(_id, store.user.cart) !== false && checkItemInCart(_id, store.user.cart) >= quantity ? <ButtonPrimary
                        onClick={() => DeleteProductHandler()}
                        borderRadius='5px'
                        margin='20px 0 0'
                        text={'Remove from cart'}
                    /> : <div className={s.add_wrapper}>
                         <div className={s.animation_wrapper} style={{ display: isAnimation ? 'block' : 'none' }}>
                            <Cart fill='var(--color-primary)' width={25} height={25} />
                        </div>
                        <p className={s.quantity}>Quantity</p>
                        <input
                            className={s.input}
                            style={{
                                border: isLoading || isAnimation ? '2px solid var(--color-primary)' : '2px solid var(--color-border)',
                                color: isLoading || isAnimation ? 'var(--color-primary)' : 'var(--color-dark)'
                            }}
                            type="number"
                            onChange={(e) => inputHandler(e.target.value)}
                            value={input}
                            disabled={!store.isAuth || isLoading || isAnimation}
                        />
                        {store.isLoading === false &&
                            <ButtonPrimary
                                disabled={!store.isAuth || isLoading || isAnimation}
                                onClick={() => AddProductHandler()}
                                borderRadius='5px'
                                margin='0 0 0 20px'
                                text={'Add to cart'}
                                backgroundColorHover='var(--color-primary)'
                            />}
                    </div>
                        :
                        <div className={s.oof}>
                            Out of stock
                        </div> : ''}
                    {quantity !== 0 && store.isLoading === false && store.isAuth === false && <NavLink className={s.sign_link} to='/account'>Sign in to add products!</NavLink>}
                </div>
            </div>
            <FullWidthSlider
                marginTop='50px'
                sameProduct_id={_id}
                params={{
                    order: 'asc',
                    category: category
                }}
                heading='Related Products'
            />
            <FullWidthSlider
                marginTop='20px'
                sameProduct_id={_id}
                params={{
                    order: 'asc',
                    sale: true,
                    sort: 'date'
                }}
                heading='Sale Products'
            />
        </div>
    )
}

export default observer(ProductDetails)