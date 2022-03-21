import type {Color, Filters} from '../../App';

const filterColors = (colors:Color[], filters:Filters) => {
    const toDelete: number[] = [];

    const sortedArr = [...colors].sort((a,b) => {
        if(a.red && a.green && a.blue && b.red && b.green && b.blue){
            return (parseInt(a.red)*1000000+parseInt(a.green)*1000+parseInt(a.blue))-(parseInt(b.red)*1000000+parseInt(b.green)*1000+parseInt(b.blue))
        }else if(a.hex && a.hex.length===7 && b.hex && b.hex.length===7){
            return (parseInt(a.hex.slice(1,3), 16)*1000000+parseInt(a.hex.slice(3,5), 16)*1000+parseInt(a.hex.slice(5,7), 16))-(parseInt(b.hex.slice(1,3), 16)*1000000+parseInt(b.hex.slice(3,5), 16)*1000+parseInt(b.hex.slice(5,7), 16))
        }else if(a.hex && a.hex.length===4 && b.hex && b.hex.length===4){
            return (parseInt(a.hex.slice(1,2)+a.hex.slice(1,2), 16)*1000000+parseInt(a.hex.slice(2,3)+a.hex.slice(2,3), 16)*1000+parseInt(a.hex.slice(3,4)+a.hex.slice(3,4), 16))-(parseInt(b.hex.slice(1,2)+b.hex.slice(1,2), 16)*1000000+parseInt(b.hex.slice(2,3)+b.hex.slice(2,3), 16)*1000+parseInt(b.hex.slice(3,4)+b.hex.slice(3,4), 16))
        }else if(a.hex && a.hex.length===7 && b.hex && b.hex.length===4){
            return (parseInt(a.hex.slice(1,3), 16)*1000000+parseInt(a.hex.slice(3,5), 16)*1000+parseInt(a.hex.slice(5,7), 16))-(parseInt(b.hex.slice(1,2)+b.hex.slice(1,2), 16)*1000000+parseInt(b.hex.slice(2,3)+b.hex.slice(2,3), 16)*1000+parseInt(b.hex.slice(3,4)+b.hex.slice(3,4), 16))
        }else if(a.hex && a.hex.length===4 && b.hex && b.hex.length===7){
            return (parseInt(a.hex.slice(1,2)+a.hex.slice(1,2), 16)*1000000+parseInt(a.hex.slice(2,3)+a.hex.slice(2,3), 16)*1000+parseInt(a.hex.slice(3,4)+a.hex.slice(3,4), 16))-(parseInt(b.hex.slice(1,3), 16)*1000000+parseInt(b.hex.slice(3,5), 16)*1000+parseInt(b.hex.slice(5,7), 16))
        }else if(a.red && a.green && a.blue && b.hex && b.hex.length===7){
            return (parseInt(a.red)*1000000+parseInt(a.green)*1000+parseInt(a.blue))-(parseInt(b.hex.slice(1,3), 16)*1000000+parseInt(b.hex.slice(3,5), 16)*1000+parseInt(b.hex.slice(5,7), 16))
        }else if(a.red && a.green && a.blue && b.hex && b.hex.length===4){
            return (parseInt(a.red)*1000000+parseInt(a.green)*1000+parseInt(a.blue))-(parseInt(b.hex.slice(1,2)+b.hex.slice(1,2), 16)*1000000+parseInt(b.hex.slice(2,3)+b.hex.slice(2,3), 16)*1000+parseInt(b.hex.slice(3,4)+b.hex.slice(3,4), 16))
        }else if(a.hex && a.hex.length===7 && b.red && b.green && b.blue){
            return (parseInt(a.hex.slice(1,3), 16)*1000000+parseInt(a.hex.slice(3,5), 16)*1000+parseInt(a.hex.slice(5,7), 16))-(parseInt(b.red)*1000000+parseInt(b.green)*1000+parseInt(b.blue))
        }else if(a.hex && a.hex.length===4 && b.red && b.green && b.blue){
            return (parseInt(a.hex.slice(1,2)+a.hex.slice(1,2), 16)*1000000+parseInt(a.hex.slice(2,3)+a.hex.slice(2,3), 16)*1000+parseInt(a.hex.slice(3,4)+a.hex.slice(3,4), 16))-(parseInt(b.red)*1000000+parseInt(b.green)*1000+parseInt(b.blue))
        }else{
            return 0;
        }
    }).reverse();

    if(filters.red.length){
        sortedArr.forEach((color, key) => {
            if(color.red && parseInt(color.red) < Math.floor((parseInt(filters.red)/100)*256)){
                toDelete.push(key)
            }else if(color.hex && color.hex.length===7 && parseInt(color.hex.slice(1,3), 16) < Math.floor((parseInt(filters.red)/100)*256)){
                toDelete.push(key)
            }else if(color.hex && color.hex.length===4 && parseInt(color.hex.slice(1,2)+color.hex.slice(1,2), 16) < Math.floor((parseInt(filters.red)/100)*256)){
                toDelete.push(key)
            }
        })
    }
    if(filters.green.length){
        sortedArr.forEach((color, key) => {
            if(color.green && parseInt(color.green) < Math.floor((parseInt(filters.green)/100)*256)){
                toDelete.push(key)
            }else if(color.hex && color.hex.length===7 && parseInt(color.hex.slice(3,5), 16) < Math.floor((parseInt(filters.green)/100)*256)){
                toDelete.push(key)
            }else if(color.hex && color.hex.length===4 && parseInt(color.hex.slice(2,3)+color.hex.slice(2,3), 16) < Math.floor((parseInt(filters.green)/100)*256)){
                toDelete.push(key)
            }
        })
    }
    if(filters.blue.length){
        sortedArr.forEach((color, key) => {
            if(color.blue && parseInt(color.blue) < Math.floor((parseInt(filters.blue)/100)*256)){
                toDelete.push(key)
            }else if(color.hex && color.hex.length===7 && parseInt(color.hex.slice(5,7), 16) < Math.floor((parseInt(filters.blue)/100)*256)){
                toDelete.push(key)
            }else if(color.hex && color.hex.length===4 && parseInt(color.hex.slice(3,4)+color.hex.slice(3,4), 16) < Math.floor((parseInt(filters.blue)/100)*256)){
                toDelete.push(key)
            }
        })
    }
    if(filters.saturation.length){
        sortedArr.forEach((color, key) => {
            if(color.type==='RGB' && color.blue && color.red && color.green && getSaturation(parseInt(color.red), parseInt(color.green), parseInt(color.blue)) < parseInt(filters.saturation)){
                toDelete.push(key)
            }else if(color.hex && color.hex.length===7 && getSaturation(parseInt(color.hex.slice(1,3), 16), parseInt(color.hex.slice(3,5), 16), parseInt(color.hex.slice(5,7), 16)) < parseInt(filters.saturation)){
                toDelete.push(key)
            }else if(color.hex && color.hex.length===4 && getSaturation(parseInt(color.hex.slice(1,2)+color.hex.slice(1,2), 16), parseInt(color.hex.slice(2,3)+color.hex.slice(2,3), 16), parseInt(color.hex.slice(3,4)+color.hex.slice(3,4), 16)) < parseInt(filters.saturation)){
                toDelete.push(key)
            }
        })
    }
    return sortedArr.filter((color, key) => !toDelete.includes(key))

}

const getSaturation = (r:number, g:number, b:number) => {
    const max = Math.max(r,g,b);
    const min = Math.min(r,g,b);
    let sat = 0;
    if(max===min){
        sat = 0;
    }else{
        const c = max-min;
        const lum = (max + min)/2;
        sat = c / (1-Math.abs(2*lum-1))
    }
    
    return Math.round(Math.abs(sat)*100)
}


export default filterColors;