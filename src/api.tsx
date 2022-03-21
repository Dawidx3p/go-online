import type { Color } from "./App";

const fetchColors = () => {
    const colors = localStorage.getItem('colors')
    if(colors){
        return JSON.parse(colors)
    }
    return undefined;
}

const updateColors = (colors:Color[]) => {
    const json = JSON.stringify(colors);
    localStorage.setItem('colors', json);
}

export {fetchColors, updateColors}