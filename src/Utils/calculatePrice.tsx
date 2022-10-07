import { ICart } from "../models/ICart"

export const calculateTotalPrice = (arr: ICart[]) => {
    return arr.reduce((total, item: ICart) => {
        return total += parseFloat(item.price) * parseFloat(item.quantity)
    }, 0)
}