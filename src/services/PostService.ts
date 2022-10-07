import $api from "../http"
import { AxiosResponse } from "axios"
import { IPost } from "../models/IPost"

export default class PostService {
    static getPost(id = '', index = ''): Promise<AxiosResponse<IPost>> {
        return $api.get<IPost>(`/post?id=${id}`)
    }
    static getPosts({title = '', order='asc', limit=''}): Promise<AxiosResponse<IPost[]>> {
        return $api.get<IPost[]>(`/posts?title=${title}&order=${order}&limit=${limit}`)
    }
}