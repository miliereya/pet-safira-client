import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IPost } from '../../../models/IPost'
import { ISearchPosts } from '../../../models/search/ISearchPosts'
import PostService from '../../../services/PostService'
import { convertDate } from '../../../Utils/convertDate'
import { CreatePostImgLink } from '../../../Utils/img'
import s from './recentPosts.module.css'

export const RecentPosts = () => {
    const [posts, setPosts] = useState<IPost[]>([])

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
    },[])

    return (
        <div className={s.section}>
            {posts.map((post:IPost) => {
                const {_id, title, date, img} = post

                return (
                    <NavLink 
                        className={s.post_item}
                        key={_id}
                        to={`/blog/${_id}`}
                    >
                        <img 
                            className={s.img}
                            src={CreatePostImgLink(img)}
                            alt={title}
                        />
                        <div className={s.wrapper}>
                            <p className={s.title}>{title}</p>
                            <p className={s.date}>{convertDate(date)}</p>
                        </div>
                    </NavLink>
                )
            })}
        </div>
    )
}