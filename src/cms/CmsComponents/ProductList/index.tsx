import { useEffect, useState } from 'react'
import { IProduct } from '../../../models/IProduct'
import { ISearchProducts } from '../../../models/search/ISearchProducts'
import ProductService from '../../../services/ProductService'
import { ProductItem } from '../ProductItem'
import s from './productList.module.css'

export const ProductList = () => {
    const [products, setProducts] = useState<IProduct[]>([])

    const params: ISearchProducts = {
        order: 'asc'
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await ProductService.getProducts(params)
                setProducts(res.data)
            } catch (e) {
                console.log(e)
            }
        }   
        fetchData()
    },[])

    return (
        <>
            <p className={s.heading}>Product list</p>
            <div className={s.section}>
                {products.length!== 0 ? (products.map(product => {
                    return (
                        <div key={product._id}>
                            <ProductItem product={product} />
                        </div>
                    )
                })): 'No products were found'}
            </div>
        </>
    )
}