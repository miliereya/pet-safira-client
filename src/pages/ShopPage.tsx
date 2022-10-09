import { useEffect, useState } from "react"
import { ShopContent } from "../components/ShopContent"
import { ShopSideBar } from "../components/ShopSideBar"
import { Breadcrumbs } from "../components/UI/Breadcrumbs"
import { IProduct } from "../models/IProduct"
import { ISearchProducts } from "../models/search/ISearchProducts"
import ProductService from "../services/ProductService"

export const ShopPage = () => {
    const [products, setProducts] = useState<IProduct[]>([])

    const [order, setOrder] = useState<'asc'|'desc'>('asc')
    const [sort, setSort] = useState<string>('name')
    const [search, setSearch] = useState<string>('')
    const [sale, setSale] = useState<boolean>(false)
    const [category, setCategory] = useState<string>('')

    const [choosenPage, setChoosenPage] = useState(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const params: ISearchProducts = {
        order: order,
        sort: sort,
        name: search,
        sale: sale,
        category: category
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            try {
                const res = await ProductService.getProducts(params)
                setChoosenPage(1)
                setProducts(res.data)
            } catch (e) {
                console.log(e)
            }
        
            setIsLoading(false)
            window.scrollTo(0, 0)
        }
        const debounce = setTimeout(() => {
			fetchData()
		}, 400)

		return () => {
			clearTimeout(debounce)
		}
    },[sort, order, search, sale, category])

    return (
        <div>
            <Breadcrumbs />
            <div className="container" style={{display: 'flex'}}>
                <ShopContent 
                    products={products}
                    setSort={setSort}
                    setOrder={setOrder}
                    isLoading={isLoading}
                    choosenPage={choosenPage}
                    setChoosenPage={setChoosenPage}  
                />
                <ShopSideBar 
                    setSearch={setSearch}
                    isLoading={isLoading}
                    setSale={setSale}
                    sale={sale}
                    setCategory={setCategory}
                    categoryChoosen={category}
                />
            </div>
        </div>
    )
}