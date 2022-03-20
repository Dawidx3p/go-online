import React, { useState } from "react";
import FormInput from "./FormInput";

const AddColor = () => {
    const [formState, setFormState] = useState({
        red: '',
        green: '',
        blue: '',
        hex: ''
    })

    const [errors, setErrors] = useState({
        red: '',
        green: '',
        blue: '',
        hex: ''
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
            
        }}>
            <FormInput name="red" {...{formState, errors, updateErrors, updateFormState}}/>
            <FormInput name="green" {...{formState, errors, updateErrors, updateFormState}}/>
            <FormInput name="blue" {...{formState, errors, updateErrors, updateFormState}}/>
            <input 
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
                }else if(value.length>7){
                    updateErrors(e.target.name, 'too many characters')
                }else{
                    updateErrors(e.target.name, 'invalid content')
                }
            }} />
            <span>{errors.hex}</span>
            <button>Add Color</button>
        </form>
    )
}

export default AddColor;