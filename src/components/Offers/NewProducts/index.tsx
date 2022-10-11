import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import s from './newproducts.module.css'
import { convertArray } from '../../../Utils/convertArray'
import { Product } from '../../Product'
import { FakeArray, ProductLoader } from '../../UI/Loaders/ProductLoader'
import { ISearchProducts } from '../../../models/search/ISearchProducts'
import ProductService from '../../../services/ProductService'
import { IProduct } from '../../../models/IProduct'

export const NewProducts = () => {
	const [newproducts, setNewproducts] = useState<any>(convertArray(FakeArray, 2))
	const params: ISearchProducts = {
		sort: 'date',
		order: 'desc'
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await ProductService.getProducts(params)
				setNewproducts(convertArray(res.data , 2))
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 3,
			slidesToSlide: 1,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 3,
			slidesToSlide: 1,
		},
		tablet: {
			breakpoint: { max: 1024, min: 425 },
			items: 3,
		},
		mobile: {
			breakpoint: { max: 425, min: 320 },
			items: 2,
		}
	}
	const wMedia = window.innerWidth


	return (
		<div className={s.block}>
			<h3 className={s.heading}>New products</h3>
			<Carousel
				responsive={responsive}
				infinite={true}
				swipeable={false}
				draggable={true}
				customTransition='transform 2500ms ease'
				containerClass={s.slider__container}
				arrows={false}
				autoPlay={true}
				autoPlaySpeed={8000}
			>
				{newproducts.map((col:[], index:number) => {
					return (
						<div key={index} className={s.porudct_col}>
							{newproducts[0][0] !== 'fake' ? (col.map((product:IProduct) => {
								return (
									<div key={product._id}>
										<Product 
											product={product}
											description='bottom'
											imgSize={225}
											fullsize={wMedia <= 768}
										/>
									</div>
								)
							})) : (col.map((fake: string, index:number) => {
								return (
									<div key={index}>
										<ProductLoader
											description='bottom'
											imgSize={225}
										/>
									</div>
								)
							}))
							}
						</div>
					)
				})}
			</Carousel>
		</div>
	)
}
