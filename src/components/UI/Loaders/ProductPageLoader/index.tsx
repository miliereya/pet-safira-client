import s from './productPageLoader.module.css'

export const ProductPageLoader = () => {
    return (
        <div className={s.section}>
            <div className={s.img}></div>
            <div className={s.col}>
                <div className={s.name}></div>
                <div className={s.rating}></div>
                <div className={s.price}></div>
                <div className={s.description_table}></div>
                <div className={s.description}></div>
            </div>
        </div>
    )
}