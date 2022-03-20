import React from "react";

interface State{
    errors:{
        [color: string]: string,
    }
    name: string,
    formState: {
        [color: string]: string,
    },
    updateFormState: (name:string, value:string) => void,
    updateErrors: (name:string, value:string) => void
}

const FormInput = (props: State) => {
    
    const {errors, name, formState, updateFormState, updateErrors} = props
    
    return(
        <>
        <input 
            type="text" 
            value={formState[name]}
            name={name}
            onChange={(e) => {
                const value = e.target.value;
                if(value.length<=3 && (parseInt(value) <= 256 || !value)){
                    updateFormState(e.target.name, value);
                    updateErrors(e.target.name, '')
                }else if(value.length>3){
                    updateErrors(e.target.name, 'too many characters')
                }else{
                    updateFormState(e.target.name, value);
                    updateErrors(e.target.name, 'invalid content')
                }
            }} />
            <span>{errors[name]}</span>
        </>
    )
}

export default FormInput;