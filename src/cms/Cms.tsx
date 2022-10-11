import { useEffect, useState } from 'react'
import { ICategory } from '../models/ICategory'
import CategoriesService from '../services/CategoriesService'
import s from './Cms.module.css'
import AddCategory from './CmsComponents/AddCategory'
import AddProduct from './CmsComponents/AddProduct'
import { ProductList } from './CmsComponents/ProductList'

export const CmsPage = () => {
    const [categories, setCategories] = useState<ICategory[] | any>([])
    const wMedia = window.innerWidth
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await CategoriesService.getCategories()
                setCategories(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    }, [])
    if(wMedia <= 768) {
        return (
            <div className={s.warning}>
                This page is not supported on mobile or tablet 
            </div>
        )
    }
    return (
        <div className="container">
            <p className={s.heading}>ALPHA VERSION</p>
            <div className={s.add_wrapper}>
                <AddProduct categories={categories} />
                <AddCategory categories={categories} />
            </div>
                <ProductList />
        </div>
    )
}