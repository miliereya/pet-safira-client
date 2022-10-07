import { FC } from 'react'
import { FullSizeImg } from '../../FullSizeImg'
import s from './productLoader.module.css'

export const FakeArray = ['fake', 'fake', 'fake', 'fake', 'fake', 'fake', 'fake', 'fake', 'fake']

interface IProductLoaderProps {
    description: 'right' | 'bottom'
    imgSize: 120|225|270|326|600
}

export const ProductLoader: FC<IProductLoaderProps> = ({description, imgSize}) => {

    return (
        <div 
            className={s.section}
            style={description==='bottom' ? {flexDirection: 'column', alignItems: 'center'} : {flexDirection: 'row'}}
        >
            <div 
                className={s.img} 
                style={{
                    width: `${imgSize}px`,
                    height: `${imgSize}px`
                }}
            >
            </div>
            <div 
                className={description === 'bottom' ? s.wrapperBottom : s.wrapperRight}
            >
                <div className={s.name}></div>
                <div className={s.category}></div>
                <div className={s.price}></div>
            </div>
        </div>
    )
}