import { useEffect, useState } from "react"
import { BlogSlider } from "../components/BlogSlider"
import { OfferLinks } from "../components/OfferLinks"
import { Offers } from "../components/Offers"
import { AdPoster } from "../components/UI/AdPoster"
import { FullWidthSlider } from "../components/UI/Sliders/FullWidthSlider"
import { IAdPoster } from "../models/IAdPoster"
import AdPosterService from "../services/AdPosterService"

export const MainPage = () => {
    const [adPosters, setAdPosters] = useState<IAdPoster[]>([])
    
    useEffect(() => {
        const fetchPosters = async () => {
            try {
                const res = await AdPosterService.getAdPosters()
                setAdPosters(res.data)
            } catch (e) {
                console.log(e)
            }
        }
        fetchPosters()
    },[])

    return (
        <>
            {adPosters[0] ? <AdPoster poster={adPosters[0]}/> : null}

            <OfferLinks />
            <Offers />

            {adPosters[1] ? <AdPoster poster={adPosters[1]}/> : null}

            <div className="container">
                <FullWidthSlider 
                    heading='Mostview Products'
                    preheading='Recently added our store'
                    params={{
                        sort: 'name',
                        order: 'asc',
                        indexes: 'mostview products'
                    }}
                    marginTop='60px'
                />
            </div>
            <BlogSlider />
            {adPosters[2] ? <AdPoster poster={adPosters[2]}/> : null}
            <div className="container">
                <FullWidthSlider 
                    heading='Featured Products'
                    preheading='Recently added our store'
                    params={{
                        sort: 'date',
                        order: 'asc'
                    }}
                    marginTop='60px'
                />
            </div>
        </>
    )
}