import { ICart } from "../models/ICart";

export const checkItemInCart = (id: string, cartArr: ICart[]): boolean|number => {
    let i = 0
    if(cartArr){
        while(i < cartArr.length) {
            if(cartArr[i].id === id) {
                return parseInt(cartArr[i].quantity)
            }
            i++
        }
    }
    return false
}