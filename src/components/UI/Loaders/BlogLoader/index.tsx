import s from './blogLoader.module.css'

export const BlogLoader = () => {
    return (
        <div className={s.section}>
            <div className={s.img}></div>
            <div className={s.title}></div>
            <div className={s.date}></div>
        </div>
    )
}