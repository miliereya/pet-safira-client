import s from './offerLinks.module.css'
import vegetables from '../../assets/images/offer-links/vegetables.png'
import fruits from '../../assets/images/offer-links/fruits.png'
import { NavLink } from 'react-router-dom'
export const OfferLinks = () => {

    return (
        <div className="container">
            <div className={s.section}>
                <NavLink to="/shop">
                    <img src={vegetables} alt="link" />
                </NavLink>
                <NavLink to="/shop">
                    <img src={fruits} alt="link" />
                </NavLink>
            </div>
        </div>
    )
}