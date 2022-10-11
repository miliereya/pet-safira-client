import React, { FC } from 'react'
import { IAdPoster } from '../../../models/IAdPoster'
import { CreateAdPosterImgLink } from '../../../Utils/img'
import { ButtonPrimary } from '../Buttons/ButtonPrimary'
import s from './adPoster.module.css'

interface AdPosterProps {
    poster: IAdPoster
}


export const AdPoster: FC<AdPosterProps> = ({poster}) => {
    return (
        <div className={s.section} key={poster._id}>
            <a href={poster.link} >
                <img className={s.img} src={CreateAdPosterImgLink(poster.img)} alt={poster.title} />
                <div className='container'>
                    <h3 className={s.title}>{poster.title}</h3>
                    <p className={s.text}>{poster.text}</p>
                    <ButtonPrimary text='read more' margin="60px 0 40px 0" />
                </div>
            </a>
        </div>
    )
}
