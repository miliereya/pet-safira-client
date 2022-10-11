import s from './pageSpinner.module.css'

export const FullPageSpinner = () => {
    return (
        <div className={s.section}>
            <div className={s.loader}></div>
        </div>
    )
}