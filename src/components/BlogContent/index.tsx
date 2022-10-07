import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import { IPost } from '../../models/IPost'
import { convertDate } from '../../Utils/convertDate'
import { CreatePostImgLink } from '../../Utils/img'
import { ButtonPrimary } from '../UI/Buttons/ButtonPrimary'
import { BlogLoader } from '../UI/Loaders/BlogLoader'
import s from './blogContent.module.css'
import { BlogRelated } from './BlogRelated'

interface BlogContentProps {
    posts: IPost[]
    post: IPost | null
    isLoading: boolean
}

export const BlogContent: FC<BlogContentProps> = ({posts, post, isLoading}) => {

    return (
        <div className={s.section}>
            {post === null && posts.length === 0 && isLoading === false ? 
            (<div className={s.nwf}>
                Nothing was found...
                <p className={s.mongo_text}>MongoDB search is a bit strange :(<br/>Try type in full word!</p> 
            </div>) 
            : isLoading === true ? 
            (<div>
                <BlogLoader />
                <BlogLoader />
            </div>) 
            : post === null ? posts.map((post:IPost) => {
                let {_id, title, img, text, date} = post

                date = convertDate(date)
                text = text.slice(0, 293) + '...'

                return (
                    <div key={_id} className={s.post}>
                        <img 
                            src={CreatePostImgLink(img)} 
                            alt={title}
                            className={s.img}
                        />
                        <h3 className={s.title}>{title}</h3>
                        <p className={s.date}>{date}|eCommerce</p>
                        <p className={s.text}>{text}</p>
                        <NavLink to={`/blog/${_id}`}>
                            <ButtonPrimary 
                                text='Read More' 
                                margin='15px 0 25px'
                                padding='15px 20px'
                                fontSize='14px'
                                borderRadius='7px'
                            />
                        </NavLink>
                    </div>
                )
            }) : (
                <div key={post._id}>
                    <img 
                        className={s.img}
                        src={CreatePostImgLink(post.img)}
                        alt={post.title}
                    />
                    <h3 className={s.title}>{post.title}</h3>
                    <p className={s.date}>{convertDate(post.date)}|eCommerce</p>
                    <p className={s.text}>{post.text}</p>
                    <BlogRelated self_id={post._id} />
                </div>
            )}
        </div>
    )
}