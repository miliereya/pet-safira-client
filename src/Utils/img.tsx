import { backendSRC } from '../config'

export const CreateProductImgLink = (slug: string, size: number) => {
    //Using 600x600 size only for good quality on demo
    //You can switch 600x600 to size variable and you'll get exact sized image
    //Try 225x225

    return `${backendSRC}/public/images/products/${slug}/600x600.jpg`
}

export const CreatePostImgLink = (slug: string) => {
    return `${backendSRC}/public/images/posts/${slug}.png`
}

export const CreateAdPosterImgLink = (slug: string) => {
    return `${backendSRC}/public/images/adPosters/${slug}.jpg`
}