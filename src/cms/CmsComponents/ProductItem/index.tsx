import { FullSizeImg } from '../../../components/UI/FullSizeImg'
import { IProduct } from '../../../models/IProduct'
import { setCurrency } from '../../../Utils/currency'
import s from './productItem.module.css'

export const ProductItem = (product:IProduct|any) => {
    const {
        _id, 
        name, 
        price, oldprice, 
        img, 
        quantity, 
        category, 
        rating, 
        company, 
        indexes
    } = product.product

    const Coldprice = setCurrency(oldprice)
    const Cprice = setCurrency(price)

    return (
        <div className={s.item} key={_id}>
            <FullSizeImg link_id={_id} slug={img} size={225} alt={name} />
            <p className={s.name}>{name}</p>
            <p className={s.string}>Category: {category}</p>
            <p className={s.string}>Price: <span style={Coldprice !== '' ? {textDecoration: 'line-through'} : {}} className={s.span}>{Coldprice !== '' ? Coldprice : Cprice}</span></p>
            <p className={s.string}>Sale: <span className={s.span}>{Coldprice !== '' ? Cprice : 'no'}</span></p>
            <p className={s.string}>Company: "{company}"</p>
            <p className={s.string}>Rating: <span className={s.span}>{rating}</span></p>
            <p className={s.string}>Quantity: <span className={s.span}>{quantity}</span></p>
            <p className={s.string}>Indexes: <span className={s.span}>{indexes ? indexes : 'no'}</span></p>
        </div>
    )
}