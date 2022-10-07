import { ICart } from "./ICart"

export interface IUser {
    email: string
    isActivated: boolean
    id: string
    cart: ICart[]
    role: string
}