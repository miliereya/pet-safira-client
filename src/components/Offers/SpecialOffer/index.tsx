import s from './specialOffer.module.css'
import offerImg from '../../../assets/images/special-offer/offer.jpg'

export const SpecialOffer = () => {
    return (
        <div className={s.section}>
            <img className={s.img} src={offerImg} alt="special offer" />
        </div>
    )
}