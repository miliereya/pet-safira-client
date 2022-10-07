import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import ProductDetails from "../components/ProductDetails"
import { Breadcrumbs } from "../components/UI/Breadcrumbs"
import { ProductPageLoader } from "../components/UI/Loaders/ProductPageLoader"
import ProductService from "../services/ProductService"

export const ProductPage = () => {
    const [product, setProduct] = useState<any>({})
    const [isLoading, setIsloading] = useState<boolean>(true)

    let pathname = useLocation().pathname
    let id = pathname.slice(9)
    let nav = useNavigate()

    window.scrollTo(0, 310)

    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true)

            try {
                const res = await ProductService.getProduct({id})
                if(res.data === null) nav('/shop')

                setProduct(res.data)
            } catch (e) {
                console.log(e)
            }

            setIsloading(false)
            window.scrollTo(0, 310)
        }
        fetchData()
    },[pathname])

    return (
        <div>
            {isLoading===false ? <Breadcrumbs title={product.name} /> : ''}
            <div className="container">
                {isLoading===true ? (<ProductPageLoader />) : (
                    <ProductDetails product={product} />
                )}
            </div>
        </div>
    )
}