import { Dispatch, FC, SetStateAction, useState } from 'react'
import { IProduct } from '../../models/IProduct'
import { calculatePagginationArray, calculateShowingResults } from '../../Utils/paggination'
import { Product } from '../Product'
import { ArrowSVG } from '../svg'
import { Arrow } from '../UI/Arrow'
import { FullPageSpinner } from '../UI/Loaders/FullPageSpinner'
import { FakeArray, ProductLoader } from '../UI/Loaders/ProductLoader'
import s from './shopContent.module.css'

interface ShopContentProps {
    products: IProduct[]
    setSort: Dispatch<SetStateAction<string>>
    setOrder: Dispatch<SetStateAction<"asc" | "desc">>
    isLoading: boolean
    choosenPage: number
    setChoosenPage: Dispatch<SetStateAction<number>>
}

export const ShopContent: FC<ShopContentProps> = ({ products, setSort, setOrder, isLoading, choosenPage, setChoosenPage }) => {
    const [sortTitle, setSortTitle] = useState<string>('Sort by name')
    const [sortPopupDisplay, setSortPopupDisplay] = useState('none')

    const [orderTitle, setOrderTitle] = useState<string>('Low to high')
    const [orderPopupDisplay, setOrderPopupDisplay] = useState('none')

    const step = 9

    const paggArr = calculatePagginationArray(step, products.length)

    const sortHandler = (title: string, value: string) => {
        setSortTitle(title)
        setSort(value)
        setSortPopupDisplay('none')
    }

    const orderHandler = (title: string, value: 'asc'|'desc') => {
        setOrderTitle(title)
        setOrder(value)
        setOrderPopupDisplay('none')
    }

    const sortList = [
        {
            id: 1,
            title: 'Sort by name',
            value: 'name'
        },
        {
            id: 2,
            title: 'Sort by price',
            value: 'price'
        },
        {
            id: 3,
            title: 'Sort by rating',
            value: 'rating'
        },
        {
            id: 4,
            title: 'Sort by date',
            value: 'date'
        }
    ]

    interface orderList {
        id: number
        title: string
        value: 'asc' | 'desc'
    }

    const orderList: orderList[] = [
        {
            id: 1,
            title: 'Low to high',
            value: 'asc'
        },
        {
            id: 2,
            title: 'High to Low',
            value: 'desc'
        }
    ]

    const wMedia = window.innerWidth

    return (
        <div className={s.section}>
            <div className={s.sort_box}>
                <button
                    className={s.sort_button}
                    onClick={() => setSortPopupDisplay(sortPopupDisplay === 'flex' ? 'none' : 'flex')}
                >
                    {sortTitle}
                    <ArrowSVG margin='0 0 0 5px' width='16px' height='10px' rotate={90} />
                </button>
                <div className={s.sort_popup} style={{ display: sortPopupDisplay }}>
                    {sortList.map((item) => {
                        const { id, title, value } = item

                        return (
                            <button
                                key={id}
                                className={s.popup_button}
                                onClick={() => sortHandler(title, value)}
                            >
                                {title}
                            </button>)
                    })}
                </div>
                <button
                    className={s.sort_button}
                    onClick={() => setOrderPopupDisplay(orderPopupDisplay === 'flex' ? 'none' : 'flex')}
                >
                    {orderTitle}
                    <ArrowSVG margin='0 0 0 5px' width='16px' height='10px' rotate={90} />
                </button>
                <div className={s.order_popup} style={{ display: orderPopupDisplay }}>
                    {orderList.map((item) => {
                        const { id, title } = item
                        const value: 'desc' | 'asc' = item.value

                        return (
                            <button
                                key={id}
                                className={s.popup_button}
                                onClick={() => orderHandler(title, value)}
                            >
                                {title}
                            </button>)
                    })}
                </div>
                {isLoading === false && <p className={s.result_text}>Showing
                    {products.length > step ? ' ' + calculateShowingResults(choosenPage, step, products.length) :
                        ` ${products.length}`} of {products.length} result{products.length === 1 ? '' : 's'}
                </p>}
            </div>
            <div className={s.product_list}>
                {isLoading === true ? wMedia > 1000 ? FakeArray.map((product, index) => {
                    return (
                        <div className={s.product} key={index}>
                            <ProductLoader description='bottom' imgSize={wMedia > 768 ? 225 : 120} fullSize={wMedia < 568} />
                        </div>
                    )
                }) : <FullPageSpinner />
                    : products.length === 0 ?
                        <div className={s.nwf}>
                            Nothing was found...
                            <p className={s.mongo_text}>MongoDB search is a bit strange :(<br />Try type in full word!</p>
                        </div>
                        : products.map((product: IProduct, index: number) => {
                            if (index < choosenPage * step - step || index > choosenPage * step - 1) return
                            return (
                                <div className={s.product} key={product._id}>
                                    <Product
                                        description='bottom'
                                        imgSize={225}
                                        product={product}
                                        width='100%'
                                        fullsize={true}
                                    />
                                </div>
                            )
                        })}
            </div>
            {isLoading === false  && <div className={s.paggination_box}>
                {paggArr.map(num => {

                    return (
                        <button
                            key={num}
                            className={s.paggination_button}
                            style={num === choosenPage ? {
                                backgroundColor: 'var(--color-primary)',
                                color: 'var(--color-white)'
                            } : {}}
                            onClick={() => (setChoosenPage(num), window.scrollTo(0, 350))}
                        >
                            {num}
                        </button>
                    )
                })}
            </div>}
        </div>
    )
}