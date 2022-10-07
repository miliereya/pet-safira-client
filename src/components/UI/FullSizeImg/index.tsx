import { FC } from "react"
import { NavLink } from "react-router-dom"
import { CreateProductImgLink } from "../../../Utils/img"

interface FullSizeImgProps {
    alt: string
    size: 120|225|270|326|600
    slug: string
    link_id?: string
    margin?: string
}

interface styles {
    width: string
    height: string
    cursor: string
    margin: string
}

export const FullSizeImg:FC<FullSizeImgProps> = ({alt, slug, size, link_id, margin = '0 auto'}) => {
    const useStyles = (val: string|number):styles=>{
        return {
            width: `${val}px`,
            height: `${val}px`,
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