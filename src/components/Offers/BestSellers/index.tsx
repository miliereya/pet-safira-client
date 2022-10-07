import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import s from './bestsellers.module.css'
import { convertArray } from '../../../Utils/convertArray'
import { Product } from '../../Product'
import { FakeArray, ProductLoader } from '../../UI/Loaders/ProductLoader'
import { ISearchProducts } from '../../../models/search/ISearchProducts'
import ProductService from '../../../services/ProductService'
import { IProduct } from '../../../models/IProduct'

export const BestSellers = () => {
	const [bestsellers, setBestsellers] = useState<any>(convertArray(FakeArray, 2))
	const params: ISearchProducts = {
		sort: 'rating'
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await ProductService.getProducts(params)
				setBestsellers(convertArray(res.data , 2))
			} catch (e) {
				console.log(e)
			}
		}

		fetchData()
	}, [])

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 2,
			slidesToSlide: 1,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 2,
			slidesToSlide: 1,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		}
	}

	return (
		<div className={s.block}>
			<h3 className={s.heading}>Best Sellers</h3>
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
				{bestsellers.map((col:[], index:number) => {
					return (
						<div key={index}>
							{bestsellers[0][0] !== 'fake' ? (col.map((product:IProduct) => {
								return (
									<div key={product._id}>
										<Product 
											product={product}
											description='right'
											imgSize={120}
										/>
									</div>
								)
							})) : (col.map((fake: string, index:number) => {
								return (
									<div key={index}>
										<ProductLoader
											description='right'
											imgSize={120}
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

// TODO: BAD ANIMATION. if change slides too fast they transform too slow. also stopped and blocked when slides ends.
