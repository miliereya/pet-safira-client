import { Divider } from '../UI/Divider'
import s from './shopSideBar.module.css'
import { DebounceInput } from 'react-debounce-input';
import { FC, useEffect, useState } from 'react';
import { CreateProductImgLink } from '../../Utils/img';
import { Spinner } from '../UI/Spinner';
import { ICategory } from '../../models/ICategory';
import CategoriesService from '../../services/CategoriesService';
import { IProduct } from '../../models/IProduct';
import ProductService from '../../services/ProductService';
import { ISearchProducts } from '../../models/search/ISearchProducts';
import { ArrowSVG } from '../svg';

interface ShopSideBarProps {
    setSearch: any
    isLoading: any
    setSale: any
    setCategory: any
    categoryChoosen: string
    sale: boolean
}

export const ShopSideBar: FC<ShopSideBarProps> = ({ setSearch, isLoading, setSale, setCategory, categoryChoosen, sale }) => {
    const [input, setInput] = useState<string>('')
    const [searchProducts, setSearchProducts] = useState<IProduct[]>([])
    const [categories, setCategories] = useState<ICategory[]|any>([])
    const [scrolled, setScrolled] = useState<boolean>(false)
    const wMedia = window.innerWidth

    const params: ISearchProducts = {
        name: input
    }

    let paddingCounter: number = 0

    useEffect(() => {
        if (input.length > 2) {
            const fetchData = async () => {
                try {
                    const res = await ProductService.getProducts(params)
                    setSearchProducts(res.data)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
        } else {
            setSearchProducts([])
            paddingCounter = 0
        }
    }, [input])

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

    const inputHandler = (val: any) => {
        setInput(val.value)
    }

    const searchHanlder = () => {
        setSearch(input)
        setSearchProducts([])
    }

    return (
        <div className={s.section} style={wMedia <= 768 ? scrolled ? {left: '1px'} : { left: '-320px' } : {}}>
            <div className={s.wrapper}>
                <p className={s.heading}>
                    Search
                </p>
                <Divider margin='5px 0 10px' />
                <DebounceInput
                    minLength={2}
                    debounceTimeout={200}
                    className={s.input}
                    type="text"
                    placeholder='Search...'
                    value={input}
                    onChange={(e: any) => inputHandler(e.target)}
                    onKeyPress={(e: any) => e.key === 'Enter' && searchHanlder()}
                />
                <div className={s.checkbox}>
                <div
                    className={s.checkbox_input}
                    onClick={() => setSale(!sale)}
                >
                    {sale ? '✓' : ''}
                </div>
                <p>Sale only</p>
                </div>
                {searchProducts.length > 0 && <div className={s.autocomplete_wrapper}>
                    {searchProducts.map((product: IProduct) => {
                        paddingCounter++

                        const { _id, name, img, category } = product

                        return (
                            <div
                                className={s.product_item}
                                key={_id}
                                style={searchProducts.length === paddingCounter && paddingCounter !== 0 ? { border: 'none' } : {}}
                                onClick={() => { setInput(name); setSearchProducts([]); searchHanlder(); setScrolled(false)}}
                            >
                                <img 
                                    src={CreateProductImgLink(img, 120)} 
                                    alt={name} 
                                    className={s.img}
                                />
                                <div className={s.desc_wrapper}>
                                    <p className={s.name}>{name}</p>
                                    <p className={s.category}>{category}</p>
                                </div>
                            </div>
                        )
                    })}</div>}
                <button
                    onClick={() => (searchHanlder(),setScrolled(false))}
                    className={s.button}
                    type='submit'
                    disabled={isLoading}
                >
                    {isLoading ? <Spinner width='48.5px' /> : 'search'}
                </button>
                <p className={s.heading}>
                    Categories
                </p>
                <Divider margin='5px 0 10px' />
                <div className={s.category_wrapper}>
                    {categories.map((category: ICategory) => {
                        const { _id, name } = category
                        return (
                            <button
                                className={s.category_button}
                                style={name === categoryChoosen ? { color: 'var(--color-primary)', textDecoration: 'underline' } : {}}
                                key={_id}
                                onClick={() => setCategory(name)}
                                disabled={name === categoryChoosen}
                            >
                                {name}
                            </button>
                        )
                    })}
                    <button
                        className={s.clear_category_button}
                        onClick={() => setCategory('')}
                    >
                        Clear category
                    </button>
                </div>
            </div>
            <button
                onClick={() => {setScrolled(true);setSearchProducts([])}}
                className={s.btn_scroller}
                style={scrolled ? { display: 'none' } : {}}
            >
                <ArrowSVG fill='#000' width={30} height={30} rotate={270} />
                <p>Search</p>
            </button>
            <button
                onClick={() => setScrolled(false)}
                className={s.btn_closer}
                style={!scrolled ? { display: 'none' } : {}}
            >
                <ArrowSVG width={60} height={60} rotate={90} />
            </button>
        </div>
    )
}