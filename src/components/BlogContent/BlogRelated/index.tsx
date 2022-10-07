import { FC, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { IPost } from '../../../models/IPost'
import { ISearchPosts } from '../../../models/search/ISearchPosts'
import PostService from '../../../services/PostService'
import { convertDate } from '../../../Utils/convertDate'
import { CreatePostImgLink } from '../../../Utils/img'
import s from './blogRelated.module.css'

interface BlogRelatedProps {
    self_id: string
}

export const BlogRelated: FC<BlogRelatedProps> = ({self_id}) => {
    const [posts, setPosts] = useState<IPost[]>([])

    const params: ISearchPosts = {
        limit: '4',
        order: 'desc'
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await PostService.getPosts(params)
                setPosts(res.data)
                //To lazy to create categories for posts to make them connected :(
            } catch (e) {
                console.log(e)
            }
        }
        fetchData()
    },[])

    return (
        <div className={s.section}>
            <p className={s.heading}>Related posts</p>
            <div className={s.wrapper}>
            {posts.map((post:IPost, index: number) => {
                const { _id, title, img, date } = post
                if (self_id === _id || index === 4) return
                return (
                    <NavLink to={`/blog/${_id}`} key={_id} className={s.post_item}>
                        <img className={s.img} src={CreatePostImgLink(img)} alt={title} />
                        <p className={s.title}>{title}</p>
                        <p className={s.date}>{convertDate(date)}</p>
                    </NavLink>
                )
            })}
            </div> 
        </div>
    )
}