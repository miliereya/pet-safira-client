import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../../..'
import { ArrowSVG } from '../../../components/svg'
import { ICategory } from '../../../models/ICategory'
import { IProduct } from '../../../models/IProduct'
import ProductService from '../../../services/ProductService'
import { Input } from '../Input'
import s from './addProduct.module.css'

interface AddProductProps {
    categories: ICategory[]
}

const AddProduct:FC<AddProductProps> = ({categories}) => {
    const {store} = useContext(Context)
    const [name, setName] = useState<string>('')

    const nameHandler = (val: any) => {
        setName(val.value)
    }


    const [description, setDescription] = useState<string>('')

    const descriptionHandler = (val: any) => {
        setDescription(val.value)
    }


    const [price, setPrice] = useState<string>('0')

    const priceHandler = (val: any) => {
        setPrice(val.value)
    }


    const [oldprice, setOldprice] = useState<string>('0')

    const oldpriceHandler = (val: any) => {
        setOldprice(val.value)
    }


    const [img, setImg] = useState<string>('')

    const imgHandler = (val: any) => {
        setImg(val.value)
    }


    const [quantity, setQuantity] = useState<string>('0')

    const quantityHandler = (val: any) => {
        setQuantity(val.value)
    }

    const [rating, setRating] = useState<string>('5.0')

    const ratingHandler = (val: any) => {
        setRating(val.value)
    }


    const [company, setCompany] = useState<string>('')

    const companyHandler = (val: any) => {
        setCompany(val.value)
    }


    const [indexes, setIndexes] = useState<string>('')

    const indexesHandler = (val: any) => {
        setIndexes(val.value)
    }

    const [category, setCategory] = useState<string>('')
    const [popupDisplay, setPopupDisplay] = useState<string>('none')

    const chooseCategoryHandler = (val: string) => {
        setCategory(val)
        setPopupDisplay('none')
    }

    const [product, setProduct] = useState<IProduct>()

    const [error, setError] = useState<string|any>('')

    useEffect(() => {
        if(product) {
            const addProduct = async () => {
                try {
                    const res = await ProductService.addProduct(product)
                    setError(res.data)
                } catch (e) {
                    console.log(e)
                }
            }
            addProduct()
        }
    },[product])

    const addProductHandler = () => {
        if(name.length<3){
            return setError('name should be more than 2 symbols')
        }
        if(description.length<11) {
            return setError('description should be more than 10 symbols')
        }
        if(parseFloat(price)<=0&&price!==''){
            return setError('price should be more than 0$')
        }
        if(parseFloat(oldprice)<0){
            return setError('Leave 0 if this product is not on sale')
        }
        if(img.length<3){
            return setError('img should be more than 2 symbols')
        }
        if(parseInt(quantity)<0){
            return setError('newprice should be more than 0 or equal')
        }
        if(parseFloat(rating)<1||parseFloat(rating)>5){
            return setError('rating should be in range from 1.0 to 5.0')
        }
        if(company==''){
            return setError('company field cant\'be empty')
        }
        if(category===''){
            return setError('choose category')
        }
        if(store.user.role !== 'admin'){
            return setError('Yor are not admin')
        }
        setError('')
        setProduct({
            _id: '',
            name: name,
            description: description,
            price: parseFloat(price),
            oldprice: oldprice !== '0'? parseFloat(oldprice) : null,
            img: img,
            quantity: parseFloat(quantity),
            rating: parseFloat(rating),
            company: company,
            category: category,
            indexes: indexes
        })
    }

    return (
        <div className={s.section}>
            <h2 className={s.heading}>Add New Product</h2>
            <div className={s.input_container}>
                <div className={s.input_column}>
                    <Input
                        title='name'
                        value={name}
                        onInput={nameHandler}
                        required={true}
                    />
                    <Input
                        title='description'
                        value={description}
                        onInput={descriptionHandler}
                        required={true}
                    />
                    <Input
                        title='price ($)'
                        value={price}
                        onInput={priceHandler}
                        required={true}
                        type={'number'}
                    />
                    <Input
                        title='oldprice'
                        value={oldprice}
                        onInput={oldpriceHandler}
                        type={'number'}
                    />
                    <Input
                        title='img slug'
                        value={img}
                        onInput={imgHandler}
                        required={true}
                    />
                </div>
                <div className={s.input_column}>
                    <Input
                        title='quantity'
                        value={quantity}
                        onInput={quantityHandler}
                        required={true}
                        type={'number'}
                    />
                    <Input
                        title='rating'
                        value={rating}
                        onInput={ratingHandler}
                        required={true}
                        type={'number'}
                    />
                    <Input
                        title='company'
                        value={company}
                        onInput={companyHandler}
                        required={true}
                    />
                    <Input
                        title='indexes'
                        value={indexes}
                        onInput={indexesHandler}
                    />

                    <div className={s.category_wrapper}>
                        <div className={s.category}>Category:
                            <span className={s.category_span}>
                                {category!=='' ? category :'none'}
                                <button className={s.arrow} onClick={() => setPopupDisplay(popupDisplay === 'none' ? 'flex' : 'none')}>
                                    <ArrowSVG width={14} height={14} />
                                </button>
                            </span>
                            <div className={s.category_popup} style={{ display: popupDisplay }}>
                                {categories.map((category: ICategory) => {

                                    return (
                                        <button
                                            onClick={() => chooseCategoryHandler(category.name)}
                                            key={category._id}
                                            className={s.category_btn}
                                        >
                                            {category.name}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p className={s.error}>{error!=='' ? '*' : ''}{error}</p>
            <button onClick={() => addProductHandler()} className={s.add_btn}>Add product</button>
        </div>
    )
}

export default observer(AddProduct)