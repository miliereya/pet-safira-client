import { FC } from "react"
import { NavLink } from "react-router-dom"
import { CreateProductImgLink } from "../../../Utils/img"

export type TProductImgSize = 120|225|270|326|425|600

interface FullSizeImgProps {
    alt: string
    slug: string
    size: TProductImgSize
    link_id?: string
    margin?: string
    fullsize?: boolean
}

interface styles {
    width: string
    height: string
    cursor: string
    margin: string
}

export const FullSizeImg:FC<FullSizeImgProps> = ({alt, slug, size, link_id, margin = '0 auto', fullsize = false}) => {
    const useStyles = (val: string|number):styles=>{
        return {
            width: fullsize ? '100%' : `${val}px`,
            height: fullsize ? '100%' : `${val}px`,
            margin: margin, 
            cursor: link_id ? 'pointer' : ''
        }
    }
    const styles = useStyles(size)

    return (
        <div>
            {link_id ? (<NavLink to={`/product/${link_id}`}>
            <img style={styles} src={CreateProductImgLink(slug, size)} alt={alt} />
        </NavLink>) : (
            <img style={styles} src={CreateProductImgLink(slug, size)} alt={alt} />
        )}
        </div>
    )
}