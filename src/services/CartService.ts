import $api from "../http"
import { AxiosResponse } from "axios"
import { ICart } from "../models/ICart"

export default class CartService {
    static AddCartItem(id: string, item: ICart): Promise<AxiosResponse<ICart[]>> {
        return $api.post<ICart[]>('/cart/add', {id: id, item: item})
    }

    static DeleteCartItem(id: string, item: ICart): Promise<AxiosResponse<ICart[]>> {
        return $api.post<ICart[]>('/cart/delete', {id: id, item: item})
    }
}