import { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IProduct } from '../../models/IProduct'
import { setCurrency } from '../../Utils/currency'
import { FullSizeImg } from '../UI/FullSizeImg'
import { Hovermenu } from '../UI/Hovermenu'
import { SaleTag } from '../UI/SaleTag'
import s from './product.module.css'

interface IProductProps {
    product: any
    description: 'right' | 'bottom'
    imgSize: 120 | 225 | 270 | 326 | 600
    width?: string
    fullsize?: boolean
}

export const Product: FC<IProductProps> = ({ product, description, imgSize, width = 'auto', fullsize = false }) => {
    const [menuToggle, setMenuToggle] = useState(false)

    const handleMenuToggle = (e: any) => {
        if (e.type === 'mouseenter') {
            setMenuToggle(true)
        } else {
            setMenuToggle(false)
        }
    }
    const productData: IProduct = product

    const {
        _id,
        name,
        category,
        price,
        oldprice,
        img
    } = productData

    const Cprice = setCurrency(price)
    const Coldprice = setCurrency(oldprice)

    return (
        <div
            className={s.section}
            key={_id}
            onMouseEnter={handleMenuToggle}
            onMouseLeave={handleMenuToggle}
            style={{ flexDirection: description === 'bottom' ? 'column' : 'row', width: width }}
        >
            {Coldprice !== '' ?
                <SaleTag productSize={imgSize < 200 ? 'sm' : 'lg'} />
                : ''
            }
            <FullSizeImg link_id={_id} alt={name} size={imgSize} slug={img} fullsize={fullsize} />
            <Hovermenu link_id={_id} menuToggle={menuToggle} location={description} />
            <div
                className={description === 'bottom' ? s.wrapperBottom : s.wrapperRight}
            >
                <p className={s.name}>{name}</p>
                <NavLink to={`/shop/${category}`}><p className={s.category}>{category}</p></NavLink>
                {Coldprice !== '' ?
                    <p className={s.price}>{Cprice}<span className={s.old_price}>{Coldprice}</span></p> :
                    <p className={s.price} style={{ color: 'var(--color-dark)' }}>{Cprice}</p>
                }
            </div>
        </div>
    )
}