import { FC, useState } from 'react'
import { IProduct } from '../../models/IProduct'
import { setCurrency } from '../../Utils/currency'
import { FullSizeImg } from '../UI/FullSizeImg'
import { Hovermenu } from '../UI/Hovermenu'
import { SaleTag } from '../UI/SaleTag'
import s from './product.module.css'

interface IProductProps {
    product: any
    description: 'right' | 'bottom'
    imgSize: 120|225|270|326|600
}

export const Product: FC<IProductProps> = ({product, description, imgSize}) => {
    const [menuToggle, setMenuToggle] = useState(false)

    const handleMenuToggle = (e:any) => {
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
            style={{flexDirection: description==='bottom' ? 'column' : 'row'}}
        >
            {Coldprice !== '' ? 
                <SaleTag productSize={imgSize < 200 ? 'sm' : 'lg'} />
                : ''
            }
            <FullSizeImg link_id={_id} alt={name} size={imgSize} slug={img}/>
            <Hovermenu link_id={_id} menuToggle={menuToggle} location={description} />
            <div 
                className={description === 'bottom' ? s.wrapperBottom : s.wrapperRight}
            >
                <p className={s.name}>{name}</p>
                <p className={s.category}>{category}</p>
                {Coldprice !== '' ?
                    <p className={s.price}>{Cprice}<span className={s.old_price}>{Coldprice}</span></p> :
                    <p className={s.price} style={{ color: 'var(--color-dark)' }}>{Cprice}</p>
                }
            </div>
        </div>
    )
}