import { FC, useEffect, useState } from 'react'
import s from './fullWidthSlider.module.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { FakeArray, ProductLoader } from '../../Loaders/ProductLoader'
import { Product } from '../../../Product'
import { ISearchProducts } from '../../../../models/search/ISearchProducts'
import ProductService from '../../../../services/ProductService'
import { IProduct } from '../../../../models/IProduct'

interface FullWidthSliderProps {
    marginTop?: string
    heading: string
    preheading?: string
    params: ISearchProducts
	sameProduct_id?: string
}

export const FullWidthSlider:FC<FullWidthSliderProps>  = (
	{
		heading,
		preheading = '',
		params,
		marginTop = '0',
		sameProduct_id
	}
	) => {
    const [products, setProducts] = useState<any>(FakeArray)

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

    const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 5,
			slidesToSlide: 1,
		},
		desktop: {
			breakpoint: { max: 3000, min: 1024 },
			items: 5,
			slidesToSlide: 1,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 5,
		}
	}

    return (
        <div style={{marginTop: marginTop}}>
            {preheading!=='' ? <p className={s.pre_heading}>{preheading}</p> : ''}
            <div className={s.heading}>{heading}</div>
            <Carousel
				responsive={responsive}
				infinite={true}
				swipeable={false}
				draggable={true}
				customTransition='transform 2000ms ease'
				containerClass={s.slider__container}
				autoPlay={true}
				autoPlaySpeed={5000}
				arrows={false}
			>
                {products[0] !== 'fake' ? (products.map((product:IProduct) => {
					if(product._id === sameProduct_id) return
					return (
						<div key={product._id}>
							<Product
								product={product}
								description='bottom'
								imgSize={225}
							/>
						</div>
					)
				})
				) : products.map((fake: string, index:number) => {
								return (
									<div key={index}>
										<ProductLoader
											description='bottom'
											imgSize={120}
										/>
									</div>
								)
							})}
			</Carousel>
        </div>
    )
}