import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { BlogContent } from "../components/BlogContent"
import { BlogSideBar } from "../components/BlogSideBar"
import { Breadcrumbs } from "../components/UI/Breadcrumbs"
import { IPost } from "../models/IPost"
import { ISearchPosts } from "../models/search/ISearchPosts"
import PostService from "../services/PostService"


export const BlogPage = () => {
    const [posts, setPosts] = useState<IPost[]>([])
    const [post, setPost] = useState<IPost | null>(null)
    const [search, setSearch] = useState<string>('')
    const [isLoading, setIsloading] = useState<boolean>(false)

    const pathname: string = useLocation().pathname

    const params: ISearchPosts = {
        title: search
    }

    let nav = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            setIsloading(true)
            setPost(null)
            if(pathname.length > 6) {
                const _id = pathname.slice(6)

                try {
                    const res = await PostService.getPost(_id)
                    !res.data ? nav('/blog') : setPost(res.data)
                } catch (e) {
                    nav('/blog')
                }
            } else {
                try {
                    const res = await PostService.getPosts(params)
                    setPosts(res.data)
                } catch (e) {
                    console.log(e)
                }

            }
            window.scrollTo(0, 0)
            setIsloading(false)
        }
        fetchData()
    },[search, pathname])

    return (
        <div>
            <Breadcrumbs title={post !== null ? post.title   : ''} />
            <div className="container">
                <div style={{display: 'flex', position: 'relative'}}>
                    <BlogContent isLoading={isLoading} post={post} posts={posts} />
                    <BlogSideBar  setSearch={setSearch} />
                </div>
            </div>
        </div>
    )
}