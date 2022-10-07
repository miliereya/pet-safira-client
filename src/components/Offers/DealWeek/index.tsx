import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IProduct } from '../../../models/IProduct'
import ProductService from '../../../services/ProductService'
import { setCurrency } from '../../../Utils/currency'
import { CreateProductImgLink } from '../../../Utils/img'
import { ButtonPrimary } from '../../UI/Buttons/ButtonPrimary'
import { SaleTag } from '../../UI/SaleTag'
import s from './dealweek.module.css'

export const DealWeek = () => {
	const [product, setProduct] = useState<IProduct | null>(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await ProductService.getProduct({index: 'deal of the week'})
				setProduct(res.data)
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])



	return (
		<div className={s.block}>
			<h3 className={s.heading}>Deals Of The Week</h3>

			{product === null ? (
			<div className={s.back_loader}>
				<div className={s.loader}>
				</div>
				<div className={s.loader_bar_1}></div>
				<div className={s.loader_bar_2}></div>
				<div className={s.loader_bar_2}></div>
				<div className={s.loader_bar_2}></div>
			</div>) : (
				<div key={product._id} className={s.wrapper}>
					<div className={s.content}>
						<NavLink to={`/product/${product._id}`}>
							<SaleTag productSize='lg'/>
							<img className={s.img} src={CreateProductImgLink(product.img, 600)} />
							<h2 className={s.name}>{product.name}</h2>
							<h3 className={s.category}>{product.category}</h3>
							<p className={s.newprice}>
								{product.oldprice ? setCurrency(product.price) : ''}
								<span className={s.price}>{setCurrency(product.oldprice)}</span>
							</p>
							<ButtonPrimary margin='20px 0 0 0' text='add to cart' />
						</NavLink>
					</div>
				</div>

			)
			}
		</div>
	)
}
