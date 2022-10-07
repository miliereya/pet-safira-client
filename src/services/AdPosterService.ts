import $api from "../http"
import { AxiosResponse } from "axios"
import { IAdPoster } from "../models/IAdPoster"

export default class AdPosterService {
    static getAdPosters(): Promise<AxiosResponse<IAdPoster[]>> {
        return $api.get<IAdPoster[]>('/adposters/get')
    }
}