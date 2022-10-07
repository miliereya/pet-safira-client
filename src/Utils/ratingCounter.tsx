export const ratingCounter = (rating:number):number => {
    let pixDiff: number = 0
    if(rating>4.7){
        pixDiff = 4.2
    } else if(rating>4.5){
        pixDiff = 2.5
    } else if(rating>4.3){
        pixDiff = 1
    }else if (rating>4.1){
        pixDiff = -2
    } else if (rating>3.7) {
        pixDiff = 4.5
    }

    let ratingPx = rating * 12.5 + rating*3 - pixDiff

    return ratingPx
}