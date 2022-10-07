import $api from "../http"
import { AxiosResponse } from "axios"
import { ICategory } from "../models/ICategory"

export default class CategoriesService {
    static getCategories(): Promise<AxiosResponse<ICategory[]>> {
        return $api.get<ICategory[]>('/category/get')
    }

    static addCategory(name: string): Promise<AxiosResponse<string>> {
        return $api.post<string>('/category/add', {name: name})
    }
}