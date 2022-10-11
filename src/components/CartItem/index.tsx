import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { ICart } from '../../models/ICart'
import { setCurrency } from '../../Utils/currency'
import { FullSizeImg } from '../UI/FullSizeImg'
import s from './cartItem.module.css'

interface CartItemProps {
    item: ICart
    deleteHanlder: (params: ICart) => void
}

export const CartItem:FC<CartItemProps> = ({item, deleteHanlder}) => {
    const {id, name, img, quantity, price} = item

    const params = {
        id: id,
        name: name,
        img: img,
        quantity: quantity.toString(),
        price: price.toString()
    }

    const wMedia = window.innerWidth

    return (
        <div className={s.item}>
            <NavLink to={`/product/${id}`} className={s.product}>
                <FullSizeImg  alt={name} slug={img} size={120} fullsize={wMedia <= 768} />
            </NavLink>
            <span className={s.name}>{name}</span>
            <span className={s.quantity}>{quantity}</span>
            <span className={s.price}>{setCurrency(parseFloat(price))}</span>
            <button className={s.delete} onClick={() => deleteHanlder(params)}>x</button>
        </div>
    )
}