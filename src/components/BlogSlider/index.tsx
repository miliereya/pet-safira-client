import { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel'
import { NavLink } from 'react-router-dom'
import { IPost } from '../../models/IPost'
import { ISearchPosts } from '../../models/search/ISearchPosts'
import PostService from '../../services/PostService'
import { convertDate } from '../../Utils/convertDate'
import { CreatePostImgLink } from '../../Utils/img'
import { ButtonMore } from '../UI/Buttons/ButtonMore'
import s from './blogSlider.module.css'

export const BlogSlider = () => {
    const [posts, setPosts] = useState<IPost[]>([])
	const [btnShow, setBtnShow] = useState(false)

    const params: ISearchPosts = {
        limit: '3'
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await PostService.getPosts(params)
                setPosts(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    })

    const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 3000 },
			items: 3,
		},
		desktop: {
			breakpoint: { max: 3000, min: 600 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 600, min: 320 },
			items: 2,
		}
	}

	const handleBtnGroupToggle = (e:any) => {
		e.type === 'mouseenter' ? setBtnShow(true) : setBtnShow(false)
	}
    const wMedia = window.innerWidth

    return (
        <div className={s.section}>
            <div className='container'>
                <div className={s.block}>
                    <h3 className={s.above__heading}>Our recent articles about Organic</h3>
                    <h2 className={s.heading}>Our Blog Posts</h2>
                </div>
                <div className={s.slider} onMouseEnter={handleBtnGroupToggle} onMouseLeave={handleBtnGroupToggle}>
                    <Carousel
                        responsive={responsive}
                        infinite={true}
                        swipeable={true}
                        draggable={true}
                        customTransition='transform 250ms ease'
                        containerClass={s.slider__container}
                        itemClass={s.slide}
                        arrows={false}
                        renderButtonGroupOutside={true}
                    >
                        {posts.map((post:IPost) => {
                            let { _id, title, date, img, text } = post
                            text = text.substr(0, 62) + '...'
                            return (
                                <div className={s.item} key={_id}>
                                    <div className={s.content__wrapper}>
                                        <NavLink to={`/blog/${_id}`}>
                                            <img 
                                                alt='post'
                                                className={s.img}
                                                src={CreatePostImgLink(img)}
                                            />
                                        </NavLink>
                                        <div className={s.body}>
                                            <div className={s.meta}>
                                                <p className={s.title}>{title}</p>
                                                {wMedia > 768 ? convertDate(date) : ''}
                                            </div>
                                            <NavLink to={`/blog/${_id}`} className={s.text}>
                                                {text}
                                            </NavLink>
                                            <ButtonMore to={`/blog/${_id}`} />
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </div>
        </div>
    )
}