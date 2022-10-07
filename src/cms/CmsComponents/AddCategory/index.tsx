import { observer } from 'mobx-react-lite'
import { FC, useContext, useEffect, useState } from 'react'
import { Context } from '../../..'
import { ICategory } from '../../../models/ICategory'
import CategoriesService from '../../../services/CategoriesService'
import { Input } from '../Input'
import s from './addCategory.module.css'

interface AddCategoryProps {
    categories: ICategory[]
}

const AddCategory:FC<AddCategoryProps> = ({categories}) => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string|any>('')
    const [category, setCategory] = useState<string>('')
    const {store} = useContext(Context)

    const nameHandler = (val: any) => {
        setName(val.value)
    }

    const addCategoryHandler = () => {
        if(name.length<3) {
            return setError('name should be more than 2 symbols')
        }
        // if(store.user.role !== 'admin'){
        //     return setError('Yor are not admin')
        // }
        setCategory(name)
    }
    useEffect(() => {
        if(category!==''){
            const addCategory = async () => {
                try {
                    const res = await CategoriesService.addCategory(name)
                    setError(res.data)
                } catch (e) {
                    console.log(e)
                }
            }
            addCategory()
        }
    },[category])

    return (
        <div className={s.section}>
            <h2 className={s.heading}>Add New Category</h2>
            <Input
                title='name'
                value={name}
                onInput={nameHandler}
                required={true}
            />
            <div className={s.wrapper}>
                Categories: 
                {categories.map(category => {
                    return (
                        <p className={s.item} key={category._id}>
                            {category.name} |   
                        </p>
                    )
                })}
            </div>
            <p className={s.error}>{error!=='' ? '*' : ''}{error}</p>
            <button onClick={() => addCategoryHandler()} className={s.add_btn}>Add product</button>
        </div>
    )
}

export default observer(AddCategory)