import React, { useState } from "react";
import './AddColor.scss';
import FormInput from "./FormInput";

import type {Color} from '../../App';

type Props = {
    addColor: (color:Color) => void
}

const AddColor = (props:Props) => {
    const { addColor } = props; 
    const [colorType, setColorType] = useState('RGB');

    const [formState, setFormState] = useState({
        name: '',
        red: '',
        green: '',
        blue: '',
        hex: ''
    })

    const [errors, setErrors] = useState({
        name: '',
        red: '',
        green: '',
        blue: '',
        hex: '',
        form: ''
    });

    const updateFormState = (name: string, newValue: string) => setFormState(prev => ({
        ...prev,
        [name]: newValue
    }))

    const updateErrors = (name: string, newValue: string) => setErrors(prev => ({
        ...prev,
        [name]: newValue
    }))

    return(
        <form className="add-color" onSubmit={(e) => {
            e.preventDefault();
            if(colorType==="RGB"){

                if((parseInt(formState.red)>=0 && parseInt(formState.red)<=256) && 
                (parseInt(formState.green)>=0 && parseInt(formState.green)<=256) && 
                (parseInt(formState.blue)>=0 && parseInt(formState.blue)<=256) && formState.name){
                    addColor({
                        id: Math.random(),
                        name: formState.name,
                        type: colorType,
                        red: formState.red,
                        green: formState.green,
                        blue: formState.blue,
                    })
                    updateErrors('form', '')
                }else{
                    updateErrors('form', 'something went wrong')
                }

            }else if(colorType==="HEX"){

                if(formState.hex.length >= 4 && formState.hex.length <= 7 && formState.name){
                    addColor({
                        id: Math.random(),
                        name: formState.name,
                        type: colorType,
                        hex: formState.hex
                    })
                    updateErrors('form', '')
                }else{
                    updateErrors('form', 'something went wrong')
                }

            }else{
                updateErrors('form', 'something went wrong')
            }
        }}>
            <h1>Add Color</h1>
            <select value={colorType} onChange={((e) => setColorType(e.target.value))}>
                <option value="RGB">RGB</option>
                <option value="HEX">HEX</option>
            </select>
            <input type="text" value={formState.name} name="name" placeholder="name" 
            onChange={(e) => setFormState(prev => ({...prev, name: e.target.value}))}
            className={errors.name ? 'invalid' : ''}/>
            <span className="error-span">{errors.name}</span>
            {colorType === 'RGB' && <>
                <FormInput name="red" {...{formState, error: errors["red"], updateErrors, updateFormState}}/>
                <FormInput name="green" {...{formState, error: errors["green"], updateErrors, updateFormState}}/>
                <FormInput name="blue" {...{formState, error: errors["blue"], updateErrors, updateFormState}}/>
            </>}

            {colorType === 'HEX' && <>
                <input 
                placeholder="hex"
                className={errors.hex? 'invalid': ''}
                type="text" 
                value={formState.hex}
                name="hex"
                onChange={(e) => {
                    const value = e.target.value;
                    if(value.length>1 && value[value.length-1]==='#'){

                        updateErrors(e.target.name, 'invalid content')
                    }else if(value.length<=7 && (parseInt(value.slice(1), 16) || value==='#' || !value)){
                        updateFormState(e.target.name, value);
                        updateErrors(e.target.name, '')
                        if(!value){
                            updateErrors(e.target.name, 'no value')
                        }
                    }else if(value.length>7){

                        updateErrors(e.target.name, 'too many characters')
                    }else{

                        updateErrors(e.target.name, 'invalid content')
                    }
                }} />
                <span className="error-span">{errors.hex}</span>
            </>}
            <button>Add Color</button>
            <span className="error-span">{errors.form}</span>
        </form>
    )
}

export default AddColor;