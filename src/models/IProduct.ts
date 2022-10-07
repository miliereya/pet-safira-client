export interface IProduct {
    _id: string
    name: string
    description: string
    price: number
    oldprice?: number | null
    img: string
    date?: string
    quantity: number
    category: string
    rating: number
    company: string
    indexes: string
}