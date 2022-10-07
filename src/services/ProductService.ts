import $api from "../http"
import { AxiosResponse } from "axios"
import { IProduct } from "../models/IProduct"

export default class ProductService {
    static getProduct({id = '', index = ''}): Promise<AxiosResponse<IProduct>> {
        return $api.get<IProduct>(`/product?id=${id}&index=${index}`)
    }

    static getProducts({sort='name', order='desc', indexes='', category='', sale = false, name = ''}): Promise<AxiosResponse<IProduct[]>> {
        return $api.get<IProduct[]>(`/products?name=${name}&sort=${sort}&sale=${sale}&order=${order}&indexes=${indexes}&category=${category}`)
    }

    static addProduct(product: IProduct): Promise<AxiosResponse<string>> {
        return $api.post<string>('/product/add', product)
    }
}