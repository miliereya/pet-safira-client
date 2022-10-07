export const currencies = {
    dollar: {
        cur: '$',
        exChange: 1
    },
    euro: {
        cur: '€',
        exChange: 0.95
    },
    ruble: {
        cur: '₽',
        exChange: 60
    }
}

export const setCurrency = (num: number | undefined | null):string => {
    const currency = localStorage.getItem('currency')
    let res = ''
    if(num!==null&&num!==undefined) {
        if(currency === currencies.euro.cur) 
            res = currencies.euro.cur + (num * currencies.euro.exChange).toFixed(2)

        else if(currency === currencies.ruble.cur){
            res = currencies.ruble.cur + (num * currencies.ruble.exChange).toFixed(2)

        } else {
            res = currencies.dollar.cur + (num * currencies.dollar.exChange).toFixed(2)

        }
    }
    return res
}

