import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { Divider } from '../UI/Divider'
import s from './blogSideBar.module.css'
import { DebounceInput } from 'react-debounce-input';
import { ButtonPrimary } from '../UI/Buttons/ButtonPrimary'
import { RecentPosts } from './RecentPosts'
import { useNavigate } from 'react-router-dom'
import { IPost } from '../../models/IPost';
import { ISearchPosts } from '../../models/search/ISearchPosts';
import PostService from '../../services/PostService';
import { ArrowSVG } from '../svg';

interface BlogSideBarProps {
    setSearch: Dispatch<SetStateAction<string>>
}

export const BlogSideBar: FC<BlogSideBarProps> = ({ setSearch }) => {
    const [input, setInput] = useState<string>('')
    const [searchPosts, setSearchPosts] = useState<IPost[]>([])
    const [scrolled, setScrolled] = useState<boolean>(false)
    const wMedia = window.innerWidth


    const nav = useNavigate()
    const params: ISearchPosts = {
        title: input
    }

    let paddingCounter: number = 0

    useEffect(() => {
        if (input.length > 2) {
            const fetchData = async () => {
                try {
                    const res = await PostService.getPosts(params)
                    setSearchPosts(res.data)
                } catch (e) {
                    console.log(e)
                }
            }
            fetchData()
        } else {
            setSearchPosts([])
            paddingCounter = 0
        }
    }, [input])

    const inputHandler = (val: any) => {
        setInput(val.value)
    }

    const searchHanlder = () => {
        nav('/blog')
        setSearch(input)
        setSearchPosts([])
    }


    return (
        <div className={s.section} style={wMedia <= 768 ? scrolled ? {} : { left: '-320px' } : {}}>
            <div className={s.wrapper}>
                <p className={s.heading}>Search</p>
                <Divider margin='5px 0 10px' />
                <DebounceInput
                    minLength={2}
                    debounceTimeout={200}
                    className={s.input}
                    type="text"
                    placeholder='Search...'
                    value={input}
                    onChange={(e: any) => inputHandler(e.target)}
                    onKeyPress={(e: any) => e.key === 'Enter' && searchHanlder()}
                />
                {searchPosts.length > 0 && <div className={s.autocomplete_wrapper}>
                    {searchPosts.map((post: IPost) => {
                        paddingCounter++

                        const { _id, title } = post

                        return (
                            <div
                                className={s.post_item}
                                key={_id}
                                style={searchPosts.length === paddingCounter && paddingCounter !== 0 ? { border: 'none' } : {}}
                                onClick={() => { setInput(title); setSearchPosts([]) }}
                            >
                                {title}
                            </div>
                        )
                    })}
                </div>}
                <button
                    onClick={() => (searchHanlder(), setScrolled(false))}
                    className={s.button}
                    type='submit'
                >
                    search
                </button>
                <p className={s.heading}>RECENT POSTS</p>
                <Divider margin='5px 0 10px' />
                <RecentPosts setScrolled={setScrolled}/>
            </div>
            <button
                onClick={() => setScrolled(true)}
                className={s.btn_scroller}
                style={scrolled ? { display: 'none' } : {}}
            >
                <ArrowSVG fill='#000' width={30} height={30} rotate={270} />
                <p>Search</p>
            </button>
            <button
                onClick={() => setScrolled(false)}
                className={s.btn_closer}
                style={!scrolled ? { display: 'none' } : {}}
            >
                <ArrowSVG width={60} height={60} rotate={90} />
            </button>
        </div>
    )
}