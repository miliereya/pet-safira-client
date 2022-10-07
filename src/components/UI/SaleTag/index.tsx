import { FC } from 'react'
import s from './saleTag.module.css'

interface SaleTagProps {
    productSize: 'sm'|'lg'  
}

export const SaleTag: FC<SaleTagProps> = ({productSize}) => {
    let sizeClass
    
    if(productSize==='sm') {
        sizeClass = s.sm
    } else {
        sizeClass = s.lg
    }

    return (
        <div className={sizeClass}>
            Sale
        </div>
    )
}